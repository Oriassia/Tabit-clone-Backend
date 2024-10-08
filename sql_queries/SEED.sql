INSERT INTO Restaurants (restId, name, lat, lng, address, category, mainphoto, phoneNumber, website, instagram, facebook, shortDescription, longDescription) VALUES
(1, 'Café Noir', 32.0657, 34.7744, 'Ahad Ha''Am St 43, Tel Aviv, Israel', 'French, Bistro', 'cafe_noir_main.jpg', '+972-3-8888678', NULL, NULL, NULL, 'A classic bistro serving French-inspired dishes.', NULL),
(2, 'Port Said', 32.0658, 34.7745, 'Har Sinai St 2, Tel Aviv, Israel', 'Middle Eastern, Bar', 'port_said_main.jpg', '+972-3-1952837', NULL, NULL, NULL, 'A lively spot for Middle Eastern tapas and drinks.', NULL),
(3, 'Taizu', 32.0659, 34.7746, 'Menachem Begin Rd 23, Tel Aviv, Israel', 'Asian, Fusion', 'taizu_main.jpg', '+972-3-1606270', NULL, NULL, NULL, 'Modern Asian fusion with a vibrant atmosphere.', NULL),
(4, 'Santa Katarina', 32.066, 34.7747, 'Har Sinai St 2, Tel Aviv, Israel', 'Mediterranean, Bar', 'santa_katarina_main.jpg', '+972-3-3509504', NULL, NULL, NULL, 'Fresh Mediterranean cuisine with an emphasis on flavor.', NULL),
(5, 'Ouzeria', 32.0661, 34.7748, 'Matalon St 44, Tel Aviv, Israel', 'Greek, Seafood', 'ouzeria_main.jpg', '+972-3-7430751', NULL, NULL, NULL, 'Authentic Greek seafood in a lively atmosphere.', NULL),
(6, 'Alena', 32.0662, 34.7749, 'Nachmani St 23-25, Tel Aviv, Israel', 'Contemporary, Fusion', 'alena_main.jpg', '+972-3-7066665', NULL, NULL, NULL, 'A blend of local and international flavors in a modern setting.', NULL),
(7, 'Brasserie M&R', 32.0663, 34.775, 'Ibn Gabirol St 70, Tel Aviv, Israel', 'French, Bistro', 'brasserie_mr_main.jpg', '+972-3-9641589', NULL, NULL, NULL, 'Classic French brasserie with a cozy vibe.', NULL),
(8, 'Shila', 32.0664, 34.7751, 'Ben Yehuda St 182, Tel Aviv, Israel', 'Grill, Seafood', 'shila_main.jpg', '+972-3-9755276', NULL, NULL, NULL, 'Specializing in fresh seafood and grilled dishes.', NULL),
(9, 'Hotel Montefiore', 32.0665, 34.7752, 'Montefiore St 36, Tel Aviv, Israel', 'Hotel, Restaurant', 'hotel_montefiore_main.jpg', '+972-3-4398598', NULL, NULL, NULL, 'Boutique hotel restaurant serving gourmet dishes.', NULL),
(10, 'Tzfon Abraxas', 32.0666, 34.7753, 'Lilienblum St 40, Tel Aviv, Israel', 'Bar, Contemporary', 'tzfon_abraxas_main.jpg', '+972-3-8019862', NULL, NULL, NULL, 'A trendy bar with a contemporary menu.', NULL);

INSERT INTO Tables (tableId, position, capacity, restId) VALUES
(10, 'bar', 6, 1),
(11, 'inside', 2, 1),
(12, 'outside', 6, 1),
(13, 'inside', 6, 1),
(14, 'outside', 6, 1),
(20, 'inside', 6, 2),
(21, 'outside', 6, 2),
(22, 'inside', 6, 2),
(23, 'inside', 2, 2),
(24, 'inside', 6, 2),
(30, 'bar', 4, 3),
(31, 'inside', 6, 3),
(32, 'inside', 6, 3),
(33, 'outside', 2, 3),
(34, 'bar', 2, 3),
(40, 'outside', 6, 4),
(41, 'inside', 6, 4),
(42, 'outside', 6, 4),
(43, 'inside', 6, 4),
(44, 'inside', 2, 4),
(50, 'outside', 4, 5),
(51, 'outside', 4, 5),
(52, 'inside', 2, 5),
(53, 'inside', 6, 5),
(54, 'outside', 6, 5),
(60, 'outside', 4, 6),
(61, 'inside', 2, 6),
(62, 'outside', 2, 6),
(63, 'inside', 2, 6),
(64, 'bar', 4, 6),
(70, 'outside', 6, 7),
(71, 'inside', 2, 7),
(72, 'inside', 4, 7),
(73, 'inside', 6, 7),
(74, 'inside', 6, 7),
(80, 'inside', 2, 8),
(81, 'inside', 4, 8),
(82, 'bar', 4, 8),
(83, 'outside', 2, 8),
(84, 'outside', 4, 8),
(90, 'bar', 2, 9),
(91, 'inside', 4, 9),
(92, 'outside', 2, 9),
(93, 'inside', 4, 9),
(94, 'bar', 4, 9),
(100, 'bar', 6, 10),
(101, 'bar', 4, 10),
(102, 'inside', 4, 10),
(103, 'outside', 4, 10),
(104, 'outside', 4, 10);

INSERT INTO Reservations (reservationId, tableId, restId, partySize, firstName, lastName, phoneNumber, email, notes, date) VALUES
(100, 10, 1, 6, 'John', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(101, 10, 1, 6, 'Sophia', 'Brown', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(110, 11, 1, 6, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(111, 11, 1, 6, 'Alex', 'Johnson', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(120, 12, 1, 2, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(121, 12, 1, 2, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(122, 12, 1, 4, 'John', 'Smith', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(130, 13, 1, 4, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(131, 13, 1, 2, 'Michael', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 13:00:00'),
(132, 13, 1, 6, 'Sophia', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(133, 13, 1, 6, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(140, 14, 1, 6, 'Sophia', 'Brown', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(141, 14, 1, 4, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(142, 14, 1, 2, 'Alex', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(200, 20, 2, 4, 'Alex', 'Doe', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(201, 20, 2, 4, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(202, 20, 2, 4, 'Emily', 'Smith', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(210, 21, 2, 2, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(211, 21, 2, 4, 'Sophia', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(220, 22, 2, 2, 'John', 'Brown', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(221, 22, 2, 4, 'Alex', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(230, 23, 2, 4, 'Alex', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(231, 23, 2, 2, 'John', 'Johnson', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 13:00:00'),
(232, 23, 2, 6, 'Michael', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(233, 23, 2, 4, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(234, 23, 2, 6, 'Emily', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 17:30:00'),
(240, 24, 2, 4, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(241, 24, 2, 2, 'Emily', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(242, 24, 2, 2, 'Michael', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(243, 24, 2, 6, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(244, 24, 2, 2, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 17:30:00'),
(300, 30, 3, 6, 'Michael', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(310, 31, 3, 6, 'Emily', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(311, 31, 3, 4, 'Sarah', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(312, 31, 3, 6, 'Sarah', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(313, 31, 3, 4, 'Sophia', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(314, 31, 3, 4, 'Michael', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 17:30:00'),
(320, 32, 3, 4, 'Michael', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(321, 32, 3, 4, 'Emily', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(322, 32, 3, 2, 'Sophia', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(323, 32, 3, 2, 'Sarah', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 16:00:00'),
(324, 32, 3, 2, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 17:30:00'),
(330, 33, 3, 2, 'Sarah', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(331, 33, 3, 4, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 13:00:00'),
(332, 33, 3, 6, 'Sarah', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(333, 33, 3, 4, 'John', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 16:00:00'),
(334, 33, 3, 6, 'Sarah', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 17:30:00'),
(340, 34, 3, 6, 'Sarah', 'Smith', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(341, 34, 3, 6, 'Michael', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(342, 34, 3, 2, 'John', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(343, 34, 3, 6, 'Alex', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(344, 34, 3, 2, 'John', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 17:30:00'),
(400, 40, 4, 4, 'Michael', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(401, 40, 4, 2, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(402, 40, 4, 2, 'Sarah', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(403, 40, 4, 2, 'Emily', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 16:00:00'),
(404, 40, 4, 6, 'Michael', 'Smith', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 17:30:00'),
(410, 41, 4, 4, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(411, 41, 4, 6, 'Sophia', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(412, 41, 4, 2, 'Sarah', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(420, 42, 4, 6, 'Sophia', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(421, 42, 4, 2, 'Emily', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(430, 43, 4, 6, 'John', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(431, 43, 4, 2, 'John', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(432, 43, 4, 2, 'Michael', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(440, 44, 4, 2, 'Alex', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(441, 44, 4, 2, 'Michael', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(442, 44, 4, 6, 'Alex', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(443, 44, 4, 6, 'Emily', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 16:00:00'),
(500, 50, 5, 4, 'John', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(510, 51, 5, 4, 'Sarah', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(511, 51, 5, 2, 'Alex', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(520, 52, 5, 2, 'Sophia', 'Brown', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(521, 52, 5, 6, 'Sarah', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(522, 52, 5, 4, 'John', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(523, 52, 5, 4, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 16:00:00'),
(524, 52, 5, 4, 'John', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 17:30:00'),
(530, 53, 5, 2, 'John', 'Brown', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(531, 53, 5, 4, 'Sophia', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(532, 53, 5, 4, 'Alex', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(533, 53, 5, 6, 'Sophia', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(534, 53, 5, 4, 'Alex', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 17:30:00'),
(540, 54, 5, 4, 'Emily', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(541, 54, 5, 6, 'Emily', 'Johnson', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(600, 60, 6, 2, 'John', 'Smith', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(601, 60, 6, 4, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(602, 60, 6, 6, 'Emily', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 14:30:00'),
(603, 60, 6, 4, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 16:00:00'),
(610, 61, 6, 4, 'Alex', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(611, 61, 6, 2, 'Alex', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(620, 62, 6, 2, 'John', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(630, 63, 6, 2, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(631, 63, 6, 2, 'Sarah', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(632, 63, 6, 2, 'Emily', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(633, 63, 6, 4, 'Michael', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 16:00:00'),
(640, 64, 6, 2, 'Michael', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(641, 64, 6, 2, 'Sarah', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(642, 64, 6, 4, 'Emily', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 14:30:00'),
(643, 64, 6, 2, 'Michael', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(644, 64, 6, 4, 'Sarah', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 17:30:00'),
(700, 70, 7, 4, 'John', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(701, 70, 7, 6, 'Sarah', 'Johnson', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(702, 70, 7, 2, 'John', 'Johnson', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(703, 70, 7, 6, 'Emily', 'Johnson', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 16:00:00'),
(704, 70, 7, 2, 'Sophia', 'Brown', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 17:30:00'),
(710, 71, 7, 6, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(711, 71, 7, 2, 'Emily', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(712, 71, 7, 4, 'John', 'Johnson', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 14:30:00'),
(713, 71, 7, 6, 'Alex', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(714, 71, 7, 4, 'Emily', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 17:30:00'),
(720, 72, 7, 6, 'Emily', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(721, 72, 7, 6, 'Alex', 'Smith', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(722, 72, 7, 2, 'John', 'Smith', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(723, 72, 7, 4, 'Michael', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 16:00:00'),
(730, 73, 7, 6, 'Michael', 'Johnson', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(731, 73, 7, 2, 'John', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(732, 73, 7, 2, 'Sophia', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(733, 73, 7, 6, 'Alex', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(740, 74, 7, 6, 'Sarah', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(741, 74, 7, 6, 'Michael', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(742, 74, 7, 4, 'Emily', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(800, 80, 8, 6, 'Michael', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(810, 81, 8, 6, 'John', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(811, 81, 8, 4, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(812, 81, 8, 4, 'Sophia', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(820, 82, 8, 4, 'Sarah', 'Johnson', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(821, 82, 8, 4, 'Sarah', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 13:00:00'),
(822, 82, 8, 2, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(830, 83, 8, 2, 'Sarah', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(831, 83, 8, 4, 'Emily', 'Smith', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(832, 83, 8, 4, 'John', 'Williams', '123-456-7890', 'test@example.com', '', '2024-08-30 14:30:00'),
(833, 83, 8, 4, 'Michael', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 16:00:00'),
(840, 84, 8, 6, 'John', 'Williams', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(841, 84, 8, 6, 'Alex', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(842, 84, 8, 4, 'Michael', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(900, 90, 9, 2, 'John', 'Smith', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(910, 91, 9, 2, 'Alex', 'Doe', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(911, 91, 9, 2, 'Michael', 'Doe', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(912, 91, 9, 4, 'Michael', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(920, 92, 9, 4, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(930, 93, 9, 4, 'Michael', 'Johnson', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(931, 93, 9, 6, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 13:00:00'),
(932, 93, 9, 6, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(940, 94, 9, 2, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 11:30:00'),
(1000, 100, 10, 2, 'Alex', 'Smith', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 11:30:00'),
(1001, 100, 10, 2, 'Sarah', 'Smith', '123-456-7890', 'test@example.com', '', '2024-08-30 13:00:00'),
(1002, 100, 10, 6, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 14:30:00'),
(1003, 100, 10, 4, 'Alex', 'Smith', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 16:00:00'),
(1010, 101, 10, 4, 'Sophia', 'Doe', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(1011, 101, 10, 4, 'Alex', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 13:00:00'),
(1012, 101, 10, 6, 'John', 'Doe', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 14:30:00'),
(1013, 101, 10, 2, 'Michael', 'Brown', '123-456-7890', 'test@example.com', '', '2024-08-30 16:00:00'),
(1020, 102, 10, 6, 'Alex', 'Smith', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(1021, 102, 10, 2, 'John', 'Williams', '123-456-7890', 'test@example.com', 'Allergic to nuts', '2024-08-30 13:00:00'),
(1030, 103, 10, 6, 'Sophia', 'Johnson', '123-456-7890', 'test@example.com', '', '2024-08-30 11:30:00'),
(1040, 104, 10, 4, 'Alex', 'Williams', '123-456-7890', 'test@example.com', 'Vegetarian', '2024-08-30 11:30:00'),
(1041, 104, 10, 6, 'Sarah', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 13:00:00'),
(1042, 104, 10, 4, 'Sophia', 'Brown', '123-456-7890', 'test@example.com', 'Celebrating birthday', '2024-08-30 14:30:00');

INSERT INTO OpeningHours (id, restId, sunday, monday, tuesday, wednesday, thursday, friday, saturday) VALUES
(1, 1, '08:00-23:00', '08:00-23:00', '08:00-23:00', '08:00-23:00', '08:00-01:00', '08:00-01:00', 'Closed'),
(2, 2, '12:00-23:00', '12:00-23:00', '12:00-23:00', '12:00-23:00', '12:00-01:00', '12:00-01:00', 'Closed'),
(3, 3, '08:00-23:00', '08:00-23:00', '08:00-23:00', '08:00-23:00', '08:00-01:00', '08:00-01:00', '08:00-23:00'),
(4, 4, '10:00-22:00', '10:00-22:00', '10:00-22:00', '10:00-22:00', '10:00-22:00', '10:00-00:00', 'Closed'),
(5, 5, '12:00-23:00', '12:00-23:00', '12:00-23:00', '12:00-23:00', '12:00-01:00', '12:00-01:00', 'Closed'),
(6, 6, '09:00-23:00', '09:00-23:00', '09:00-23:00', '09:00-23:00', '09:00-23:00', '09:00-00:00', 'Closed'),
(7, 7, '08:00-23:00', '08:00-23:00', '08:00-23:00', '08:00-23:00', '08:00-01:00', '08:00-01:00', '08:00-23:00'),
(8, 8, '10:00-22:00', '10:00-22:00', '10:00-22:00', '10:00-22:00', '10:00-00:00', '10:00-00:00', 'Closed'),
(9, 9, '12:00-23:00', '12:00-23:00', '12:00-23:00', '12:00-23:00', '12:00-01:00', '08:00-01:00', 'Closed'),
(10, 10, '09:00-23:00', '09:00-23:00', '09:00-23:00', '09:00-23:00', '09:00-23:00', '09:00-00:00', 'Closed');

INSERT INTO RestaurantMenus (menuId, restId, title, url) VALUES
(1, 1, 'Dinner Menu', 'http://cafenoir.co.il/dinner_menu.pdf'),
(2, 2, 'Tasting Menu', 'http://port-said.co.il/tasting_menu.pdf'),
(3, 3, 'Lunch Menu', 'http://taizu.co.il/lunch_menu.pdf'),
(4, 4, 'Main Menu', 'http://santa-katarina.co.il/m`photoId`ain_menu.pdf'),
(5, 5, 'Seasonal Menu', 'http://ouzeria.co.il/seasonal_menu.pdf'),
(6, 6, 'Brunch Menu', 'http://alena.co.il/brunch_menu.pdf'),
(7, 7, 'Seafood Menu', 'http://brasserie.co.il/seafood_menu.pdf'),
(8, 8, 'Grill Menu', 'http://shila.co.il/grill_menu.pdf'),
(9, 9, 'Gourmet Menu', 'http://hotelmontefiore.co.il/gourmet_menu.pdf'),
(10, 10, 'Creative Menu', 'http://abraxas.co.il/creative_menu.pdf');

INSERT INTO RestaurantsPhotos (photoId, restId, url) VALUES
(1, 1, 'cafe_noir_inside.jpg'),
(2, 1, 'cafe_noir_outside.jpg'),
(3, 2, 'port_said_inside.jpg'),
(4, 2, 'port_said_outside.jpg'),
(5, 3, 'taizu_inside.jpg'),
(6, 3, 'taizu_outside.jpg'),
(7, 4, 'santa_katarina_inside.jpg'),
(8, 4, 'santa_katarina_outside.jpg'),
(9, 5, 'ouzeria_inside.jpg'),
(10, 5, 'ouzeria_outside.jpg'),
(11, 6, 'alena_inside.jpg'),
(12, 6, 'alena_outside.jpg'),
(13, 7, 'brasserie_inside.jpg'),
(14, 7, 'brasserie_outside.jpg'),
(15, 8, 'shila_inside.jpg'),
(16, 8, 'shila_outside.jpg'),
(17, 9, 'hotel_montefiore_inside.jpg'),
(18, 9, 'hotel_montefiore_outside.jpg'),
(19, 10, 'tzfon_abraxas_inside.jpg'),
(20, 10, 'tzfon_abraxas_outside.jpg');
