const express = require("express");
const router = new express.Router();
const Invitation = require("../models/Invitation");

router.get(`/`, async (req, res, next) => {
  const invitationID = req.query.id;
  const response = await Invitation.getByID(invitationID);

  return res.json(response);
});

router.post("/", async (req, res, next) => {
  try {
    const { email, friendGroupID, invitingUserID } = req.body;
    const invitation = await Invitation.createInvitation(
      email,
      friendGroupID,
      invitingUserID
    );

    return res.json(invitation);
  } catch (e) {
    console.log(e);
  }
});

router.post(`/accept`, async (req, res, next) => {
  const invitationID = req.body.id;
  const userID = req.body.userID;
  const invitation = await Invitation.getByID(invitationID);
  const result = await invitation.accept(userID);

  return res.json(result);
});

router.post(`/decline`, async (req, res, next) => {
  const invitationID = req.body.id;
  const result = await Invitation.deactivateByID(invitationID);

  return res.json(result);
});

module.exports = router;
