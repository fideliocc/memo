const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport= require("passport");

// Validation
const validatePostInput = require("../../validation/post");

const User = require("../../models/User");
const Post = require("../../models/Post");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
      status: "pending"
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   GET api/posts
// @desc    Get Posts (with "Approved status")
// @access  Public
router.get("/", (req, res) => {
  Post.find({ status: "approved"})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});


// @route   GET api/posts/:id
// @desc    Get post by Id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(
      post =>
        post
          ? res.json(post)
          : res.status(404).json({ nopostfound: "No post found with that Id" })
    )
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that Id" })
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the user logged in
    User.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route   GET api/posts/favorites
// @desc    Get posts faved by user
// @access  Private
router.get("/favorites", passport.authenticate("jwt", { session: false }), (req, res) => {
  User.findById(req.user.id).then(user => {
    // Use mongoDB query $elemMatch
    Post.find({ favorites: { $elemMatch:{ user } }}).then(posts => {
      res.json(posts)
    })
  })
})

// @route   GET api/posts/favorites/:id
// @desc    Get posts faved by user
// @access  Private
router.get("/favorites/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    // Use mongoDB query $elemMatch
    Post.find({ favorites: { $elemMatch:{ user } }})
    //.sort({ date: -1 })
    .then(posts => {
      res.json(posts)
    })
  })
})

// @route   GET api/posts/user/:user_id
// @desc    Get Posts (with "Approved status") by user Id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  Post.find({ $and: [{ user: req.params.user_id }, { status: "approved" }] })
    .sort({ date: -1 })
    //.then(myposts => {res.json(myposts)})
    .then(myposts => {res.json(myposts)})
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});


// @route   POST api/posts/like/:id
// @desc    Like or Unlike a post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the user logged in
    User.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          let ownLike = post.likes.filter(like => like.user.toString() === req.user.id);
          if (ownLike.length > 0) {
            // Clean if like exists
            // Se debe filtrar para remover solo el like del mismo usuario.
            // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);


          } else {
            // Add the user Id to Likes array
            post.likes.unshift({ user: req.user.id });
          }
          // and save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);


// @route   POST api/posts/favorite/:id
// @desc    Fav a post
// @access  Private

router.post("/favorite/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  // Find the user logged in
  User.findOne({ user: req.user.id }).then(user => {
    Post.findById(req.params.id)
      .then(post => {
        let ownFav = post.favorites.filter(favorite => favorite.user.toString() === req.user.id)
        if(ownFav.length > 0) {
          // Get removeIndex if fav exists
          const removeIndex = post.favorites
            .map(item => item.user.toString())
            .indexOf(req.user.id);

            // Splice out of array
            post.favorites.splice(removeIndex, 1)
        } else {
          // Add the user Id to Favs array
          post.favorites.unshift({ user: req.user.id });
        }
        // and save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }))
  })
})


// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      const { errors, isValid } = validatePostInput(req.body);

      // Check Validation
      if (!isValid) {
        // If any errors send 400 with errors object
        return res.status(400).json(errors);
      }

      const newComment = {
        text: req.body.text,
        name: req.user.name,
        user: req.user.id
      };

      // Add to comments array
      post.comments.unshift(newComment);
      // and save
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.json(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from a post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
          // Check if current user owns the comment
          if(req.user.id !== post.comments[removeIndex].user.toString()) {
            return res.status(404).json({ notauthorized: 'Not authorized to delete this comment'})
          }

          // Splice comment out of array
          post.comments.splice(removeIndex, 1);
          // and save
          post.save().then(post => res.json(post));
        })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);



module.exports = router;
