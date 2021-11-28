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
    (11, 1),
    (1891, 2),
    (11, 2);

INSERT INTO user_tv (
    tv_id,
    user_id
) VALUES
    (60554, 1),
    (82856, 1),
    (4194, 1),
    (82856, 2),
    (4194, 2);

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
    1,
    3
),
(
    2,
    1
),
(
    2,
    3
);

INSERT INTO app_data (
    app_data_key,
    value
) VALUES
    ('lastGenreSync', null);

INSERT INTO genre (
    id,
    name
) VALUES
    (12,'Adventure'),
    (14,'Fantasy'),
    (16,'Animation'),
    (18,'Drama'),
    (27,'Horror'),
    (28,'Action'),
    (35,'Comedy'),
    (36,'History'),
    (37,'Western'),
    (53,'Thriller'),
    (80,'Crime'),
    (99,'Documentary'),
    (878,'Science Fiction'),
    (9648,'Mystery'),
    (10402,'Music'),
    (10749,'Romance'),
    (10751,'Family'),
    (10752,'War'),
    (10759,'Action & Adventure'),
    (10762,'Kids'),
    (10763,'News'),
    (10764,'Reality'),
    (10765,'Sci-Fi & Fantasy'),
    (10766,'Soap'),
    (10767,'Talk'),
    (10768,'War & Politics'),
    (10770,'TV Movie');

INSERT INTO movie_genre (
    movie_id,
    genre_id
) VALUES
    (1892, 12),
    (1892, 28),
    (1892, 878),
    (1891, 12),
    (1891, 28),
    (1891, 878),
    (11, 12),
    (11, 28),
    (11, 878);

INSERT INTO tv_genre (
    tv_id,
    genre_id
) VALUES
    (60554, 10759),
    (60554, 16),
    (82856, 10765),
    (82856, 10759),
    (82856, 37),
    (82856, 18),
    (4194, 10759),
    (4194, 16),
    (4194, 10765);

INSERT INTO keyword (
    id,
    name
) VALUES
    (380, 'sibling relationship'),
    (526, 'rebel'),
    (801, 'bounty hunter'),
    (803, 'android'),
    (1612, 'spacecraft'),
    (2280, 'emperor'),
    (2902, 'space battle'),
    (3373, 'snowstorm'),
    (3388, 'space colony'),
    (4270, 'galaxy'),
    (4271, 'hermit'),
    (5144, 'matter of life and death'),
    (6212, 'smuggling (contraband)'),
    (10013, 'death star'),
    (10014, 'jabba the hutt'),
    (10015, 'ewoks'),
    (10016,	'lightsaber'),
    (10527, 'jedi'),
    (11107,	'rescue mission'),
    (11195, 'empire'),
    (11196,	'rebellion'),
    (11606, 'space western'),
    (13194,	'planet'),
    (160134, 'the force'),
    (161176, 'space opera'),
    (163295, 'galactic war'),
    (178710, 'stormtrooper'),
    (178712, 'totalitarianism'),
    (191132, 'space exploration'),
    (195114, 'space adventure'),
    (210346, 'wookie'),
    (232452, 'jedi master'),
    (232453, 'jedi training'),
    (232454, 'droid');

INSERT INTO movie_keyword (
    movie_id,
    keyword_id
) VALUES
    (1892, 380),
    (1892, 526),
    (1892, 1612),
    (1892, 2280),
    (1892, 2902),
    (1892, 5144),
    (1892, 10013),
    (1892, 10014),
    (1892, 10015),
    (1892, 10527),
    (1892, 161176),
    (1891, 3373),
    (1891, 3388),
    (1891, 10016),
    (1891, 10527),
    (1891, 11196),
    (1891, 160134),
    (1891, 161176),
    (1891, 178710),
    (1891, 210346),
    (1891, 232452),
    (1891, 232453),
    (1891, 232454),
    (11, 803),
    (11, 4270),
    (11, 4271),
    (11, 6212),
    (11, 10013),
    (11, 10016),
    (11, 10527),
    (11, 11107),
    (11, 11195),
    (11, 11196),
    (11, 13194),
    (11, 160134),
    (11, 161176),
    (11, 163295),
    (11, 178710),
    (11, 178712);

INSERT INTO tv_keyword (
    tv_id,
    keyword_id
) VALUES
    (4194, 161176),
    (60554, 161176),
    (82856, 801),
    (82856, 11606),
    (82856, 161176),
    (82856, 191132),
    (82856, 195114);

INSERT INTO invitation (
    id,
    email,
    friend_group_id,
    inviting_user_id,
    is_active
) VALUES (
    'f4dca540-41a2-479f-814e-628bbeb66e6a',
    'invited.user@nodomain.com',
    1,
    1,
    true
);