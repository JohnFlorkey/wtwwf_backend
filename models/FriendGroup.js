const db = require("../db");
const { v4: uuid } = require("uuid");
const Movie = require("./Movie");
const TV = require("./TV");
const User = require("./User");

class FriendGroup {
  constructor({ id, members = [], name }) {
    this.id = id;
    this.members = members;
    this.name = name;
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

  async addMemberByID(userID) {
    try {
      const newMember = await User.getById(userID);
      const result = await db.query(
        `INSERT INTO user_friend_group (
          friend_group_id,
          user_id
        ) VALUES (
          $1,
          $2
        ) RETURNING id`,
        [this.id, userID]
      );

      this.members.push(newMember);

      return this;
    } catch (e) {
      console.log(e);
    }
  }

  static async create(newName) {
    try {
      const result = await db.query(
        `INSERT INTO friend_group (
          name
        ) VALUES ($1)
        RETURNING id, name`,
        [newName]
      );
      const { id, name } = result.rows[0];
      const friendGroup = new FriendGroup({ id, name });

      return friendGroup;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteMemberByID(userID) {
    const result = await db.query(
      `DELETE FROM user_friend_group
      WHERE friend_group_id = $1
        AND user_id = $2
      RETURNING id AS userFriendGroupID`,
      [this.id, userID]
    );

    return result.rows[0].userfriendgroupid;
  }

  static async getByID(friendGroupID) {
    const friendGroupResult = await db.query(
      `SELECT
        id,
        name
      FROM friend_group
      WHERE id = $1`,
      [friendGroupID]
    );

    const friendGroupData = {};
    if (friendGroupResult.rows.length > 0) {
      friendGroupData.id = friendGroupResult.rows[0].id;
      friendGroupData.name = friendGroupResult.rows[0].name;
      friendGroupData.members = [];

      const friendGroupUsersResult = await User.getByFriendGroupID(
        friendGroupID
      );
      if (friendGroupUsersResult.length > 0)
        friendGroupData.members = friendGroupUsersResult;
    }

    let friendGroup = {};
    if (Object.keys(friendGroupData).length > 0) {
      friendGroup = new FriendGroup(friendGroupData);
    }

    return friendGroup;
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

  async getMovieRecommendations() {
    try {
      const seedResult = await db.query(
        `SELECT
          m.id as movie_id,
          SUM(m.popularity) AS weighted_popularity,
          COUNT(*) as appearances
        FROM friend_group as fg
        INNER JOIN user_friend_group as ufg ON ufg.friend_group_id = fg.id
        INNER JOIN user_movie as um ON um.user_id = ufg.user_id
        INNER JOIN movie as m ON m.id = um.movie_id
        WHERE fg.id = $1
          AND um.watched = false
        GROUP BY m.id
        ORDER BY appearances DESC, weighted_popularity DESC`,
        [this.id]
      );

      const movies = await Promise.all(
        seedResult.rows.map((r) => Movie.getById(r.movie_id))
      );

      return movies;
    } catch (e) {
      console.log(e);
    }
  }

  async getTVRecommendations() {
    try {
      const seedResult = await db.query(
        `SELECT
          tv.id as tv_id,
          SUM(tv.popularity) AS weighted_popularity,
          COUNT(*) as appearances
        FROM friend_group as fg
        INNER JOIN user_friend_group as ufg ON ufg.friend_group_id = fg.id
        INNER JOIN user_tv as ut ON ut.user_id = ufg.user_id
        INNER JOIN tv as tv ON tv.id = ut.tv_id
        WHERE fg.id = $1
          AND ut.watched = false
        GROUP BY tv.id
        ORDER BY appearances DESC, weighted_popularity DESC`,
        [this.id]
      );

      const tv = await Promise.all(
        seedResult.rows.map((r) => TV.getById(r.tv_id))
      );

      return tv;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FriendGroup;
