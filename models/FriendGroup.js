const db = require("../db");

class FriendGroup {
  constructor({ id, members = [], name }) {
    this.id = id;
    this.members = members;
    this.name = name;
  }

  static async getByUserID(userID) {
    try {
      const result = await db.query(
        `SELECT
          fg.id AS friend_group_id,
          fg.name,
          up.id AS user_id,
          up.username
        FROM friend_group AS fg
        LEFT OUTER JOIN user_friend_group AS ufg ON ufg.friend_group_id = fg.id
        LEFT OUTER JOIN user_profile AS up ON up.id = ufg.user_id
        WHERE EXISTS (
          SELECT 'X'
          FROM user_friend_group as iufg
          WHERE user_id = $1
              AND iufg.friend_group_id = ufg.friend_group_id
        )
        `,
        [userID]
      );

      const friendGroupsObj = {};
      for (let r of result.rows) {
        if (!friendGroupsObj[r.friend_group_id]) {
          friendGroupsObj[r.friend_group_id] = {
            id: r.friend_group_id,
            members: [
              {
                userID: r.user_id,
                username: r.username,
              },
            ],
            name: r.name,
          };
        } else {
          friendGroupsObj[r.friend_group_id].members.push({
            userID: r.user_id,
            username: r.username,
          });
        }
      }
      const friendGroups = [];
      for (let f of Object.values(friendGroupsObj)) {
        friendGroups.push(new FriendGroup(f));
      }

      return friendGroups;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FriendGroup;
