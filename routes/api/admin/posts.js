const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passportadmin = require("passport");

// Validation
const validatePostInput = require("../../../validation/post");

const Post = require("../../../models/Post");
const User = require("../../../models/User")

// @route   PUT api/admin/posts/:id/edit
// @desc    Update Post Text and Status (find by Post Id)
// @access  Private
router.put("/:id/edit", passportadmin.authenticate("jwt-admin", { session: false }), (req, res) => {
  Post.findOneAndUpdate({"_id": req.params.id}, { $set: {"text": req.body.text, "status": "approved" } })
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
})

// @route   PUT api/admin/posts/:id
// @desc    Update Post Status (find by Post Id)
// @access  Private
router.put("/:id", passportadmin.authenticate("jwt-admin", { session: false }), (req, res) => {
  Post.findOneAndUpdate({"_id": req.params.id}, { $set: {"status": "approved"} })
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
})

// @route   GET api/admin/posts/pending
// @desc    Get all posts with "Pending" status
// @access  Private
router.get("/pending", passportadmin.authenticate("jwt-admin", { session: false }), (req, res) => {
    Post.find({ status: "pending"})
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  });

// @route   GET api/admin/posts/:id
// @desc    Get post by Id (any post!)
// @access  Private
router.get("/:id", passportadmin.authenticate("jwt-admin", { session: false }), (req, res) => {
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

// @route   DELETE api/admin/posts/:id
// @desc    Delete a post
// @access  Private
router.delete(
    "/:id",
    passportadmin.authenticate("jwt-admin", { session: false }),
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

module.exports = router;