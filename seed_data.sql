\c wtwwf;

INSERT INTO user_profile (
    country,
    email,
    password,
    username
) VALUES
(
    'US',
    'test_user@nodomain.com',
    'hepdahep',
    'TestUser'
),
(
    'US',
    'test_user2@nodomain.com',
    'hepdahep',
    'TestUser2'
),
(
    'US',
    'test_user3@nodomain.com',
    'hepdahep',
    'TestUser3'
);

INSERT INTO movie (
    id,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average
) VALUES
    (
        1891,
        'The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.',
        24.976,
        '/2mObg4LWxo4BicFUykGm6oauxHt.jpg',
        '1980-05-20',
        124,
        'The Empire Strikes Back',
        8.4
    ),
    (
        11,
        'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
        67.053,
        '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
        '1977-05-25',
        121,
        'Star Wars',
        8.2
    ),
    (
        1892,
        'Luke Skywalker leads a mission to rescue his friend Han Solo from the clutches of Jabba the Hutt, while the Emperor seeks to destroy the Rebellion once and for all with a second dreaded Death Star.',
        23.348,
        '/mDCBQNhR6R0PVFucJl0O4Hp5klZ.jpg',
        '1983-05-25',
        135,
        'Return of the Jedi',
        7.9
    );

INSERT INTO tv (
    id,
    episode_runtime,
    first_air_date,
    name,
    overview,
    popularity,
    poster_path,
    vote_average
) VALUES
    (
        60554,
        '{22}',
        '2014-10-13',
        'Star Wars Rebels',
        'Set between the events of Star Wars: Episodes III and IV, the story unfolds during a dark time when the evil Galactic Empire is tightening its grip of power on the galaxy. Imperial forces have occupied a remote planet and are ruining the lives of its people. The motley but clever crew of the starship Ghost — cowboy Jedi Kanan, ace pilot Hera, street-smart teenager Ezra, the “muscle” Zeb, warrior firebrand Sabine, and cantankerous old astromech droid Chopper — is among a select few who are brave enough to stand against the Empire. Together, they will face threatening new villains, encounter colorful adversaries, embark on thrilling adventures, and become heroes with the power to ignite a rebellion.',
        47.289,
        '/vOUxo5sfXyQPIoF8rtYK1OVVBPi.jpg',
        7.7
    ),
    (
        82856,
        '{35,48}',
        '2019-11-12',
        'The Mandalorian',
        'After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.',
        234.396,
        '/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
        8.5
    ),
    (
        4194,
        '{25,30,22}',
        '2008-10-03',
        'Star Wars: The Clone Wars',
        'Yoda, Obi-Wan Kenobi, Anakin Skywalker, Mace Windu and other Jedi Knights lead the Grand Army of the Republic against the droid army of the Separatists.',
        74.21,
        '/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg',
        8.5
    );

INSERT INTO user_movie (
    movie_id,
    user_id
) VALUES
    (1891, 1),
    (1892, 1),
    (11, 1);

INSERT INTO user_tv (
    tv_id,
    user_id
) VALUES
    (60554, 1),
    (82856, 1),
    (4194, 1);

INSERT INTO friend_group (
    name
) VALUES (
    'Best Friends'
),
(
    'Family'
);

INSERT INTO user_friend_group (
    friend_group_id,
    user_id
) VALUES (
    1,
    1
),
(
    1,
    2
),
(
    2,
    1
),
(
    2,
    3
);