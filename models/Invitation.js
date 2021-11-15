const db = require("../db");
const { v4: uuid } = require("uuid");
const FriendGroup = require("./FriendGroup");
const User = require("./User");

class Invitation {
  constructor({ id, friendGroup, invitingUser, isActive }) {
    this.id = id;
    this.friendGroup = friendGroup;
    this.invitingUser = invitingUser;
    this.isActive = isActive;
  }

  async accept(userID) {
    try {
      const addMemberResult = await this.friendGroup.addMemberByID(userID);
      const deactivateResult = await Invitation.deactivateByID(this.id);

      return true;
    } catch (e) {
      console.log(e);
    }
  }

  static async createInvitation(email, friendGroupID, invitingUserID) {
    try {
      const friendGroup = await FriendGroup.getByID(friendGroupID);
      const user = await User.getById(invitingUserID);
      const result = await db.query(
        `INSERT INTO invitation (
          id,
          email,
          friend_group_id,
          inviting_user_id,
          is_active
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          true
        ) RETURNING id`,
        [uuid(), email, friendGroup.id, user.id]
      );

      return result.rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  static async deactivateByID(invitationID) {
    const result = await db.query(
      `UPDATE invitation
			SET is_active = false
			WHERE id = $1
			RETURNING id`,
      [invitationID]
    );

    return result.rows[0];
  }

  static async getByID(invitationID) {
    const result = await db.query(
      `SELECT
				id,
				friend_group_id,
				inviting_user_id,
				is_active
			FROM invitation
			WHERE id = $1`,
      [invitationID]
    );

    const { id, friend_group_id, inviting_user_id, is_active } = result.rows[0];

    const friendGroup = await FriendGroup.getByID(friend_group_id);
    const invitingUser = await User.getById(inviting_user_id);
    const invitation = new Invitation({
      id,
      friendGroup,
      invitingUser,
      is_active,
    });

    return invitation;
  }
}

module.exports = Invitation;
