--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-12-28 19:15:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3712 (class 0 OID 20253)
-- Dependencies: 215
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.address VALUES (1, 'Greece', 'Chania', 'Skalidi 5');
INSERT INTO public.address VALUES (2, 'Greece', 'Athens', 'Ermou');
INSERT INTO public.address VALUES (3, 'Greece', 'Chania', 'Kentro 43');
INSERT INTO public.address VALUES (4, 'Greece', 'Athens', 'Ermou 38');
INSERT INTO public.address VALUES (5, 'USA', 'Anytown', '123 Innovation Avenue');
INSERT INTO public.address VALUES (6, 'USA', 'Anytown', '789 Biomed Plaza');
INSERT INTO public.address VALUES (7, 'Greece', 'Athens', '23 Dionysiou Street');


--
-- TOC entry 3722 (class 0 OID 20290)
-- Dependencies: 225
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3718 (class 0 OID 20276)
-- Dependencies: 221
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_content_type VALUES (1, 'apps', 'address');
INSERT INTO public.django_content_type VALUES (2, 'apps', 'phone');
INSERT INTO public.django_content_type VALUES (3, 'users', 'userscredentials');
INSERT INTO public.django_content_type VALUES (4, 'users', 'users');
INSERT INTO public.django_content_type VALUES (5, 'users', 'universitydetails');
INSERT INTO public.django_content_type VALUES (6, 'users', 'educationdetails');
INSERT INTO public.django_content_type VALUES (7, 'companies', 'companies');
INSERT INTO public.django_content_type VALUES (8, 'companies', 'companiesadmins');
INSERT INTO public.django_content_type VALUES (9, 'companies', 'workson');
INSERT INTO public.django_content_type VALUES (10, 'admin', 'logentry');
INSERT INTO public.django_content_type VALUES (11, 'auth', 'permission');
INSERT INTO public.django_content_type VALUES (12, 'auth', 'group');
INSERT INTO public.django_content_type VALUES (13, 'auth', 'user');
INSERT INTO public.django_content_type VALUES (14, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type VALUES (15, 'sessions', 'session');
INSERT INTO public.django_content_type VALUES (16, 'posts', 'postsprivate');
INSERT INTO public.django_content_type VALUES (17, 'companies', 'workrequests');
INSERT INTO public.django_content_type VALUES (18, 'posts', 'postprivatelikes');
INSERT INTO public.django_content_type VALUES (19, 'posts', 'postspublic');
INSERT INTO public.django_content_type VALUES (20, 'posts', 'postpubliclikes');
INSERT INTO public.django_content_type VALUES (21, 'posts', 'postsprivatelikes');
INSERT INTO public.django_content_type VALUES (22, 'posts', 'postspubliclikes');
INSERT INTO public.django_content_type VALUES (23, 'posts', 'postsprivatecomments');
INSERT INTO public.django_content_type VALUES (24, 'posts', 'postspubliccomments');
INSERT INTO public.django_content_type VALUES (25, 'users', 'friendrequests');
INSERT INTO public.django_content_type VALUES (26, 'users', 'friends');
INSERT INTO public.django_content_type VALUES (27, 'chats', 'privatechat');
INSERT INTO public.django_content_type VALUES (31, 'projects', 'projectdivision');
INSERT INTO public.django_content_type VALUES (32, 'projects', 'projects');
INSERT INTO public.django_content_type VALUES (33, 'projects', 'projectassign');
INSERT INTO public.django_content_type VALUES (34, 'projects', 'projectadmin');
INSERT INTO public.django_content_type VALUES (29, 'groupchats', 'groupadmins');
INSERT INTO public.django_content_type VALUES (35, 'groupchats', 'groupchat');
INSERT INTO public.django_content_type VALUES (30, 'groupchats', 'groupmembers');
INSERT INTO public.django_content_type VALUES (28, 'groupchats', 'groups');
INSERT INTO public.django_content_type VALUES (36, 'groups', 'groups');
INSERT INTO public.django_content_type VALUES (37, 'groups', 'groupadmins');
INSERT INTO public.django_content_type VALUES (38, 'groups', 'groupmembers');
INSERT INTO public.django_content_type VALUES (39, 'groups', 'groupchat');


--
-- TOC entry 3720 (class 0 OID 20284)
-- Dependencies: 223
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_permission VALUES (1, 'Can add address', 1, 'add_address');
INSERT INTO public.auth_permission VALUES (2, 'Can change address', 1, 'change_address');
INSERT INTO public.auth_permission VALUES (3, 'Can delete address', 1, 'delete_address');
INSERT INTO public.auth_permission VALUES (4, 'Can view address', 1, 'view_address');
INSERT INTO public.auth_permission VALUES (5, 'Can add phone', 2, 'add_phone');
INSERT INTO public.auth_permission VALUES (6, 'Can change phone', 2, 'change_phone');
INSERT INTO public.auth_permission VALUES (7, 'Can delete phone', 2, 'delete_phone');
INSERT INTO public.auth_permission VALUES (8, 'Can view phone', 2, 'view_phone');
INSERT INTO public.auth_permission VALUES (9, 'Can add users credentials', 3, 'add_userscredentials');
INSERT INTO public.auth_permission VALUES (10, 'Can change users credentials', 3, 'change_userscredentials');
INSERT INTO public.auth_permission VALUES (11, 'Can delete users credentials', 3, 'delete_userscredentials');
INSERT INTO public.auth_permission VALUES (12, 'Can view users credentials', 3, 'view_userscredentials');
INSERT INTO public.auth_permission VALUES (13, 'Can add users', 4, 'add_users');
INSERT INTO public.auth_permission VALUES (14, 'Can change users', 4, 'change_users');
INSERT INTO public.auth_permission VALUES (15, 'Can delete users', 4, 'delete_users');
INSERT INTO public.auth_permission VALUES (16, 'Can view users', 4, 'view_users');
INSERT INTO public.auth_permission VALUES (17, 'Can add university details', 5, 'add_universitydetails');
INSERT INTO public.auth_permission VALUES (18, 'Can change university details', 5, 'change_universitydetails');
INSERT INTO public.auth_permission VALUES (19, 'Can delete university details', 5, 'delete_universitydetails');
INSERT INTO public.auth_permission VALUES (20, 'Can view university details', 5, 'view_universitydetails');
INSERT INTO public.auth_permission VALUES (21, 'Can add education details', 6, 'add_educationdetails');
INSERT INTO public.auth_permission VALUES (22, 'Can change education details', 6, 'change_educationdetails');
INSERT INTO public.auth_permission VALUES (23, 'Can delete education details', 6, 'delete_educationdetails');
INSERT INTO public.auth_permission VALUES (24, 'Can view education details', 6, 'view_educationdetails');
INSERT INTO public.auth_permission VALUES (25, 'Can add companies', 7, 'add_companies');
INSERT INTO public.auth_permission VALUES (26, 'Can change companies', 7, 'change_companies');
INSERT INTO public.auth_permission VALUES (27, 'Can delete companies', 7, 'delete_companies');
INSERT INTO public.auth_permission VALUES (28, 'Can view companies', 7, 'view_companies');
INSERT INTO public.auth_permission VALUES (29, 'Can add companies admins', 8, 'add_companiesadmins');
INSERT INTO public.auth_permission VALUES (30, 'Can change companies admins', 8, 'change_companiesadmins');
INSERT INTO public.auth_permission VALUES (31, 'Can delete companies admins', 8, 'delete_companiesadmins');
INSERT INTO public.auth_permission VALUES (32, 'Can view companies admins', 8, 'view_companiesadmins');
INSERT INTO public.auth_permission VALUES (33, 'Can add works on', 9, 'add_workson');
INSERT INTO public.auth_permission VALUES (34, 'Can change works on', 9, 'change_workson');
INSERT INTO public.auth_permission VALUES (35, 'Can delete works on', 9, 'delete_workson');
INSERT INTO public.auth_permission VALUES (36, 'Can view works on', 9, 'view_workson');
INSERT INTO public.auth_permission VALUES (37, 'Can add log entry', 10, 'add_logentry');
INSERT INTO public.auth_permission VALUES (38, 'Can change log entry', 10, 'change_logentry');
INSERT INTO public.auth_permission VALUES (39, 'Can delete log entry', 10, 'delete_logentry');
INSERT INTO public.auth_permission VALUES (40, 'Can view log entry', 10, 'view_logentry');
INSERT INTO public.auth_permission VALUES (41, 'Can add permission', 11, 'add_permission');
INSERT INTO public.auth_permission VALUES (42, 'Can change permission', 11, 'change_permission');
INSERT INTO public.auth_permission VALUES (43, 'Can delete permission', 11, 'delete_permission');
INSERT INTO public.auth_permission VALUES (44, 'Can view permission', 11, 'view_permission');
INSERT INTO public.auth_permission VALUES (45, 'Can add group', 12, 'add_group');
INSERT INTO public.auth_permission VALUES (46, 'Can change group', 12, 'change_group');
INSERT INTO public.auth_permission VALUES (47, 'Can delete group', 12, 'delete_group');
INSERT INTO public.auth_permission VALUES (48, 'Can view group', 12, 'view_group');
INSERT INTO public.auth_permission VALUES (49, 'Can add user', 13, 'add_user');
INSERT INTO public.auth_permission VALUES (50, 'Can change user', 13, 'change_user');
INSERT INTO public.auth_permission VALUES (51, 'Can delete user', 13, 'delete_user');
INSERT INTO public.auth_permission VALUES (52, 'Can view user', 13, 'view_user');
INSERT INTO public.auth_permission VALUES (53, 'Can add content type', 14, 'add_contenttype');
INSERT INTO public.auth_permission VALUES (54, 'Can change content type', 14, 'change_contenttype');
INSERT INTO public.auth_permission VALUES (55, 'Can delete content type', 14, 'delete_contenttype');
INSERT INTO public.auth_permission VALUES (56, 'Can view content type', 14, 'view_contenttype');
INSERT INTO public.auth_permission VALUES (57, 'Can add session', 15, 'add_session');
INSERT INTO public.auth_permission VALUES (58, 'Can change session', 15, 'change_session');
INSERT INTO public.auth_permission VALUES (59, 'Can delete session', 15, 'delete_session');
INSERT INTO public.auth_permission VALUES (60, 'Can view session', 15, 'view_session');
INSERT INTO public.auth_permission VALUES (61, 'Can add posts private', 16, 'add_postsprivate');
INSERT INTO public.auth_permission VALUES (62, 'Can change posts private', 16, 'change_postsprivate');
INSERT INTO public.auth_permission VALUES (63, 'Can delete posts private', 16, 'delete_postsprivate');
INSERT INTO public.auth_permission VALUES (64, 'Can view posts private', 16, 'view_postsprivate');
INSERT INTO public.auth_permission VALUES (65, 'Can add work requests', 17, 'add_workrequests');
INSERT INTO public.auth_permission VALUES (66, 'Can change work requests', 17, 'change_workrequests');
INSERT INTO public.auth_permission VALUES (67, 'Can delete work requests', 17, 'delete_workrequests');
INSERT INTO public.auth_permission VALUES (68, 'Can view work requests', 17, 'view_workrequests');
INSERT INTO public.auth_permission VALUES (69, 'Can add post private likes', 18, 'add_postprivatelikes');
INSERT INTO public.auth_permission VALUES (70, 'Can change post private likes', 18, 'change_postprivatelikes');
INSERT INTO public.auth_permission VALUES (71, 'Can delete post private likes', 18, 'delete_postprivatelikes');
INSERT INTO public.auth_permission VALUES (72, 'Can view post private likes', 18, 'view_postprivatelikes');
INSERT INTO public.auth_permission VALUES (73, 'Can add posts public', 19, 'add_postspublic');
INSERT INTO public.auth_permission VALUES (74, 'Can change posts public', 19, 'change_postspublic');
INSERT INTO public.auth_permission VALUES (75, 'Can delete posts public', 19, 'delete_postspublic');
INSERT INTO public.auth_permission VALUES (76, 'Can view posts public', 19, 'view_postspublic');
INSERT INTO public.auth_permission VALUES (77, 'Can add post public likes', 20, 'add_postpubliclikes');
INSERT INTO public.auth_permission VALUES (78, 'Can change post public likes', 20, 'change_postpubliclikes');
INSERT INTO public.auth_permission VALUES (79, 'Can delete post public likes', 20, 'delete_postpubliclikes');
INSERT INTO public.auth_permission VALUES (80, 'Can view post public likes', 20, 'view_postpubliclikes');
INSERT INTO public.auth_permission VALUES (81, 'Can add posts private likes', 21, 'add_postsprivatelikes');
INSERT INTO public.auth_permission VALUES (82, 'Can change posts private likes', 21, 'change_postsprivatelikes');
INSERT INTO public.auth_permission VALUES (83, 'Can delete posts private likes', 21, 'delete_postsprivatelikes');
INSERT INTO public.auth_permission VALUES (84, 'Can view posts private likes', 21, 'view_postsprivatelikes');
INSERT INTO public.auth_permission VALUES (85, 'Can add posts public likes', 22, 'add_postspubliclikes');
INSERT INTO public.auth_permission VALUES (86, 'Can change posts public likes', 22, 'change_postspubliclikes');
INSERT INTO public.auth_permission VALUES (87, 'Can delete posts public likes', 22, 'delete_postspubliclikes');
INSERT INTO public.auth_permission VALUES (88, 'Can view posts public likes', 22, 'view_postspubliclikes');
INSERT INTO public.auth_permission VALUES (89, 'Can add posts private comments', 23, 'add_postsprivatecomments');
INSERT INTO public.auth_permission VALUES (90, 'Can change posts private comments', 23, 'change_postsprivatecomments');
INSERT INTO public.auth_permission VALUES (91, 'Can delete posts private comments', 23, 'delete_postsprivatecomments');
INSERT INTO public.auth_permission VALUES (92, 'Can view posts private comments', 23, 'view_postsprivatecomments');
INSERT INTO public.auth_permission VALUES (93, 'Can add posts public comments', 24, 'add_postspubliccomments');
INSERT INTO public.auth_permission VALUES (94, 'Can change posts public comments', 24, 'change_postspubliccomments');
INSERT INTO public.auth_permission VALUES (95, 'Can delete posts public comments', 24, 'delete_postspubliccomments');
INSERT INTO public.auth_permission VALUES (96, 'Can view posts public comments', 24, 'view_postspubliccomments');
INSERT INTO public.auth_permission VALUES (97, 'Can add friend requests', 25, 'add_friendrequests');
INSERT INTO public.auth_permission VALUES (98, 'Can change friend requests', 25, 'change_friendrequests');
INSERT INTO public.auth_permission VALUES (99, 'Can delete friend requests', 25, 'delete_friendrequests');
INSERT INTO public.auth_permission VALUES (100, 'Can view friend requests', 25, 'view_friendrequests');
INSERT INTO public.auth_permission VALUES (101, 'Can add friends', 26, 'add_friends');
INSERT INTO public.auth_permission VALUES (102, 'Can change friends', 26, 'change_friends');
INSERT INTO public.auth_permission VALUES (103, 'Can delete friends', 26, 'delete_friends');
INSERT INTO public.auth_permission VALUES (104, 'Can view friends', 26, 'view_friends');
INSERT INTO public.auth_permission VALUES (105, 'Can add private chat', 27, 'add_privatechat');
INSERT INTO public.auth_permission VALUES (106, 'Can change private chat', 27, 'change_privatechat');
INSERT INTO public.auth_permission VALUES (107, 'Can delete private chat', 27, 'delete_privatechat');
INSERT INTO public.auth_permission VALUES (108, 'Can view private chat', 27, 'view_privatechat');
INSERT INTO public.auth_permission VALUES (109, 'Can add group chats', 28, 'add_groupchats');
INSERT INTO public.auth_permission VALUES (110, 'Can change group chats', 28, 'change_groupchats');
INSERT INTO public.auth_permission VALUES (111, 'Can delete group chats', 28, 'delete_groupchats');
INSERT INTO public.auth_permission VALUES (112, 'Can view group chats', 28, 'view_groupchats');
INSERT INTO public.auth_permission VALUES (113, 'Can add group chats admins', 29, 'add_groupchatsadmins');
INSERT INTO public.auth_permission VALUES (114, 'Can change group chats admins', 29, 'change_groupchatsadmins');
INSERT INTO public.auth_permission VALUES (115, 'Can delete group chats admins', 29, 'delete_groupchatsadmins');
INSERT INTO public.auth_permission VALUES (116, 'Can view group chats admins', 29, 'view_groupchatsadmins');
INSERT INTO public.auth_permission VALUES (117, 'Can add group chat members', 30, 'add_groupchatmembers');
INSERT INTO public.auth_permission VALUES (118, 'Can change group chat members', 30, 'change_groupchatmembers');
INSERT INTO public.auth_permission VALUES (119, 'Can delete group chat members', 30, 'delete_groupchatmembers');
INSERT INTO public.auth_permission VALUES (120, 'Can view group chat members', 30, 'view_groupchatmembers');
INSERT INTO public.auth_permission VALUES (121, 'Can add project division', 31, 'add_projectdivision');
INSERT INTO public.auth_permission VALUES (122, 'Can change project division', 31, 'change_projectdivision');
INSERT INTO public.auth_permission VALUES (123, 'Can delete project division', 31, 'delete_projectdivision');
INSERT INTO public.auth_permission VALUES (124, 'Can view project division', 31, 'view_projectdivision');
INSERT INTO public.auth_permission VALUES (125, 'Can add projects', 32, 'add_projects');
INSERT INTO public.auth_permission VALUES (126, 'Can change projects', 32, 'change_projects');
INSERT INTO public.auth_permission VALUES (127, 'Can delete projects', 32, 'delete_projects');
INSERT INTO public.auth_permission VALUES (128, 'Can view projects', 32, 'view_projects');
INSERT INTO public.auth_permission VALUES (129, 'Can add project assign', 33, 'add_projectassign');
INSERT INTO public.auth_permission VALUES (130, 'Can change project assign', 33, 'change_projectassign');
INSERT INTO public.auth_permission VALUES (131, 'Can delete project assign', 33, 'delete_projectassign');
INSERT INTO public.auth_permission VALUES (132, 'Can view project assign', 33, 'view_projectassign');
INSERT INTO public.auth_permission VALUES (133, 'Can add project admin', 34, 'add_projectadmin');
INSERT INTO public.auth_permission VALUES (134, 'Can change project admin', 34, 'change_projectadmin');
INSERT INTO public.auth_permission VALUES (135, 'Can delete project admin', 34, 'delete_projectadmin');
INSERT INTO public.auth_permission VALUES (136, 'Can view project admin', 34, 'view_projectadmin');
INSERT INTO public.auth_permission VALUES (137, 'Can add group chat conversation', 35, 'add_groupchatconversation');
INSERT INTO public.auth_permission VALUES (138, 'Can change group chat conversation', 35, 'change_groupchatconversation');
INSERT INTO public.auth_permission VALUES (139, 'Can delete group chat conversation', 35, 'delete_groupchatconversation');
INSERT INTO public.auth_permission VALUES (140, 'Can view group chat conversation', 35, 'view_groupchatconversation');
INSERT INTO public.auth_permission VALUES (141, 'Can add group admins', 29, 'add_groupadmins');
INSERT INTO public.auth_permission VALUES (142, 'Can change group admins', 29, 'change_groupadmins');
INSERT INTO public.auth_permission VALUES (143, 'Can delete group admins', 29, 'delete_groupadmins');
INSERT INTO public.auth_permission VALUES (144, 'Can view group admins', 29, 'view_groupadmins');
INSERT INTO public.auth_permission VALUES (145, 'Can add group chat', 35, 'add_groupchat');
INSERT INTO public.auth_permission VALUES (146, 'Can change group chat', 35, 'change_groupchat');
INSERT INTO public.auth_permission VALUES (147, 'Can delete group chat', 35, 'delete_groupchat');
INSERT INTO public.auth_permission VALUES (148, 'Can view group chat', 35, 'view_groupchat');
INSERT INTO public.auth_permission VALUES (149, 'Can add group members', 30, 'add_groupmembers');
INSERT INTO public.auth_permission VALUES (150, 'Can change group members', 30, 'change_groupmembers');
INSERT INTO public.auth_permission VALUES (151, 'Can delete group members', 30, 'delete_groupmembers');
INSERT INTO public.auth_permission VALUES (152, 'Can view group members', 30, 'view_groupmembers');
INSERT INTO public.auth_permission VALUES (153, 'Can add groups', 28, 'add_groups');
INSERT INTO public.auth_permission VALUES (154, 'Can change groups', 28, 'change_groups');
INSERT INTO public.auth_permission VALUES (155, 'Can delete groups', 28, 'delete_groups');
INSERT INTO public.auth_permission VALUES (156, 'Can view groups', 28, 'view_groups');
INSERT INTO public.auth_permission VALUES (157, 'Can add groups', 36, 'add_groups');
INSERT INTO public.auth_permission VALUES (158, 'Can change groups', 36, 'change_groups');
INSERT INTO public.auth_permission VALUES (159, 'Can delete groups', 36, 'delete_groups');
INSERT INTO public.auth_permission VALUES (160, 'Can view groups', 36, 'view_groups');
INSERT INTO public.auth_permission VALUES (161, 'Can add group admins', 37, 'add_groupadmins');
INSERT INTO public.auth_permission VALUES (162, 'Can change group admins', 37, 'change_groupadmins');
INSERT INTO public.auth_permission VALUES (163, 'Can delete group admins', 37, 'delete_groupadmins');
INSERT INTO public.auth_permission VALUES (164, 'Can view group admins', 37, 'view_groupadmins');
INSERT INTO public.auth_permission VALUES (165, 'Can add group members', 38, 'add_groupmembers');
INSERT INTO public.auth_permission VALUES (166, 'Can change group members', 38, 'change_groupmembers');
INSERT INTO public.auth_permission VALUES (167, 'Can delete group members', 38, 'delete_groupmembers');
INSERT INTO public.auth_permission VALUES (168, 'Can view group members', 38, 'view_groupmembers');
INSERT INTO public.auth_permission VALUES (169, 'Can add group chat', 39, 'add_groupchat');
INSERT INTO public.auth_permission VALUES (170, 'Can change group chat', 39, 'change_groupchat');
INSERT INTO public.auth_permission VALUES (171, 'Can delete group chat', 39, 'delete_groupchat');
INSERT INTO public.auth_permission VALUES (172, 'Can view group chat', 39, 'view_groupchat');


--
-- TOC entry 3724 (class 0 OID 20298)
-- Dependencies: 227
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3726 (class 0 OID 20304)
-- Dependencies: 229
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_user VALUES (1, 'pbkdf2_sha256$600000$pJhNpXYAyKcQCJVdyFTzhg$mrMb9kVOiUfMix7XHu8dMJmoISogk+FSu/ixFjx7u8M=', '2023-12-27 12:31:08.795942+02', true, 'borakis', '', '', '', true, true, '2023-11-08 17:33:15.209089+02');


--
-- TOC entry 3728 (class 0 OID 20312)
-- Dependencies: 231
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3730 (class 0 OID 20318)
-- Dependencies: 233
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3741 (class 0 OID 20462)
-- Dependencies: 244
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.companies VALUES (4, 'TechVerse Solutions', 'techverse-solutions', '"TechVerse Solutions is a cutting-edge startup IT company focused on revolutionizing data analytics for small and medium-sized businesses. Our company specializes in developing AI-powered software solutions that streamline data management, offer predictive analytics, and optimize decision-making processes. By harnessing the latest advancements in machine learning and data science, we empower businesses to extract valuable insights from their data, enabling them to make informed strategic choices and drive growth. Comprising a team of visionary data scientists, software engineers, and industry experts, we''re committed to delivering innovative tools that transform raw data into actionable intelligence, helping businesses thrive in an increasingly data-centric world."', 'company_image/IMG_20210917_121110.jpg', '1998-02-06', '2023-12-26', 4, '+306984576230');
INSERT INTO public.companies VALUES (5, 'Tech Solutions Inc.', 'tech-solutions-inc', 'Technology consulting firm specializing in software development and IT solutions.', '', '2010-07-15', '2023-12-27', 5, '+12564895623');
INSERT INTO public.companies VALUES (6, 'BioHealth Pharmaceuticals', 'biohealth-pharmaceuticals', 'Biotechnology firm dedicated to developing innovative medicines and treatments.', '', '2014-11-11', '2023-12-27', 6, '+12532010102');
INSERT INTO public.companies VALUES (7, 'Olympus Software Solutions SA', 'olympus-software-solutions-sa', 'Software development company specializing in custom applications and digital solutions.', '', '2013-09-25', '2023-12-27', 7, '+302101234567');
INSERT INTO public.companies VALUES (1, 'Eurodata', 'eurodata', 'Eurodata is a pioneering company specializing in providing innovative digital solutions and advanced technological services. Renowned for its expertise in digital transformation, Eurodata focuses on delivering cutting-edge software solutions, cloud-based applications, and data-driven services tailored to meet the evolving needs of modern businesses.', '', '2023-11-08', '2023-11-08', 1, '+302821026594');
INSERT INTO public.companies VALUES (2, 'Tele Inc.', 'tele-inc', 'Tele Inc. is a forward-thinking company specializing in telecommunications solutions and services. With a focus on connectivity and communication, Tele Inc. provides a range of cutting-edge telecommunication products, including telephony systems, network infrastructure, and unified communication solutions.', '', '2023-11-08', '2023-11-08', 2, '+302101695485');


--
-- TOC entry 3732 (class 0 OID 20376)
-- Dependencies: 235
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log VALUES (1, '2023-11-08 17:36:40.520869+02', '2', 'second@mail.gr', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (2, '2023-11-08 17:39:13.728563+02', '1', '(+30) 6942885327', 1, '[{"added": {}}]', 2, 1);
INSERT INTO public.django_admin_log VALUES (3, '2023-11-08 17:39:42.46492+02', '1', 'Christos Borakis', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (4, '2023-11-08 17:39:52.360343+02', '1', 'Christos Borakis', 2, '[{"changed": {"fields": ["Image"]}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (5, '2023-11-08 17:40:46.507023+02', '2', '(+44) 5648512354', 1, '[{"added": {}}]', 2, 1);
INSERT INTO public.django_admin_log VALUES (6, '2023-11-08 17:40:53.530912+02', '2', 'Alexis Papadakis', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (7, '2023-11-08 17:41:23.630922+02', '1', 'Christos Borakis 5th High School of Chania', 1, '[{"added": {}}]', 6, 1);
INSERT INTO public.django_admin_log VALUES (8, '2023-11-08 17:41:40.980372+02', '1', 'Christos Borakis Technical University Of Crete', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (9, '2023-11-08 17:42:33.68246+02', '1', 'Greece (Skalidi 5 Chania)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (10, '2023-11-08 17:42:55.137067+02', '1', 'Eurobank', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (11, '2023-11-08 17:44:10.45526+02', '2', 'Greece (Ermou Athens)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (12, '2023-11-08 17:44:24.08393+02', '3', '(+30) 2105445845', 1, '[{"added": {}}]', 2, 1);
INSERT INTO public.django_admin_log VALUES (13, '2023-11-08 17:44:27.86084+02', '2', 'Telemarketing', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (14, '2023-11-08 17:44:38.966957+02', '1', '[A] Christos Borakis -> Eurobank', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (15, '2023-11-09 13:59:57.536667+02', '1', '[Eurobank] administrated by Alexis Papadakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (16, '2023-11-09 14:11:07.000536+02', '2', '[A] Alexis Papadakis -> Telemarketing', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (17, '2023-11-09 14:13:32.919247+02', '3', 'aa@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (18, '2023-11-09 14:14:06.403133+02', '4', '(+30) 6915487526', 1, '[{"added": {}}]', 2, 1);
INSERT INTO public.django_admin_log VALUES (19, '2023-11-09 14:14:11.569378+02', '3', 'George Papadakis', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (20, '2023-11-09 14:14:38.601414+02', '3', '[A] George Papadakis -> Eurobank', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (21, '2023-11-09 14:17:39.629977+02', '638', '[Telemarketing] administrated by George Papadakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (22, '2023-11-09 14:20:14.871088+02', '648', '[Telemarketing] administrated by George Papadakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (23, '2023-11-09 14:49:12.257431+02', '3', 'George Papadakis', 2, '[{"changed": {"fields": ["Phone"]}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (24, '2023-11-09 14:49:33.813576+02', '1', 'Christos Borakis', 2, '[{"changed": {"fields": ["Phone"]}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (25, '2023-11-10 15:29:51.002684+02', '5', 'dimitra@gmail.com', 3, '', 3, 1);
INSERT INTO public.django_admin_log VALUES (26, '2023-11-10 15:29:54.578522+02', '4', 'petros@gmail.com', 3, '', 3, 1);
INSERT INTO public.django_admin_log VALUES (27, '2023-11-10 15:30:11.121981+02', '6', 'markos@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (28, '2023-11-10 15:30:39.163176+02', '3', 'aa@gmail.com', 2, '[]', 3, 1);
INSERT INTO public.django_admin_log VALUES (29, '2023-11-10 15:30:43.43303+02', '2', 'second@mail.gr', 2, '[]', 3, 1);
INSERT INTO public.django_admin_log VALUES (30, '2023-11-10 15:30:45.637484+02', '1', 'first@email.com', 2, '[]', 3, 1);
INSERT INTO public.django_admin_log VALUES (31, '2023-11-10 15:31:29.163675+02', '2', 'Alexis Papadakis', 2, '[{"changed": {"fields": ["Phone"]}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (32, '2023-11-10 15:31:51.397727+02', '2', 'Telemarketing', 2, '[{"changed": {"fields": ["Phone"]}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (33, '2023-11-10 15:31:59.842939+02', '1', 'Eurobank', 2, '[{"changed": {"fields": ["Phone"]}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (34, '2023-11-10 15:32:18.862073+02', '656', '[Telemarketing] administrated by George Papadakis', 2, '[]', 8, 1);
INSERT INTO public.django_admin_log VALUES (35, '2023-11-10 15:32:31.315393+02', '656', '[Telemarketing] administrated by George Papadakis', 2, '[]', 8, 1);
INSERT INTO public.django_admin_log VALUES (36, '2023-11-10 15:32:34.491765+02', '656', '[Eurobank] administrated by George Papadakis', 2, '[{"changed": {"fields": ["Company"]}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (37, '2023-11-10 15:32:42.636848+02', '656', '[Telemarketing] administrated by George Papadakis', 2, '[{"changed": {"fields": ["Company"]}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (38, '2023-11-10 15:32:46.899856+02', '656', '[Eurobank] administrated by George Papadakis', 2, '[{"changed": {"fields": ["Company"]}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (39, '2023-11-10 15:34:38.115307+02', '656', '[Eurobank] administrated by George Papadakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (40, '2023-11-10 15:34:40.73538+02', '630', '[Telemarketing] administrated by Alexis Papadakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (41, '2023-11-10 15:34:43.17883+02', '618', '[Eurobank] administrated by Christos Borakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (42, '2023-12-06 12:15:58.207889+02', '1', 'PostsPrivate object (1)', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (43, '2023-12-06 12:26:31.583233+02', '2', '[[A] Christos Borakis -> Eurobank] First Post', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (44, '2023-12-06 12:29:37.67961+02', '3', '[Telemarketing - Alexis Papadakis] FIrst post of telemarketing', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (45, '2023-12-06 12:32:58.652715+02', '4', '[Telemarketing - Alexis Papadakis] First post of the day', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (46, '2023-12-09 13:56:21.254329+02', '2', '[Eurobank - Christos Borakis] First Post', 2, '[{"changed": {"fields": ["Image"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (47, '2023-12-09 14:42:49.570686+02', '1', '[P] George Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (48, '2023-12-09 14:42:57.69227+02', '1', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (49, '2023-12-09 14:44:48.919307+02', '1', '[D] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (50, '2023-12-09 14:44:55.986539+02', '1', '[P] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (51, '2023-12-09 15:00:17.022613+02', '1', '[P] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (52, '2023-12-09 15:00:22.401201+02', '1', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (53, '2023-12-09 15:00:29.05654+02', '1', '[P] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (54, '2023-12-09 15:02:33.531899+02', '1', '[P] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (55, '2023-12-09 15:02:37.650348+02', '1', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (56, '2023-12-09 15:53:42.490661+02', '1', '[P] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (57, '2023-12-09 15:53:49.902845+02', '1', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (58, '2023-12-09 16:15:50.866969+02', '1', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (59, '2023-12-09 16:17:17.500885+02', '1', '*[Telemarketing]* administrated by George Papadakis', 1, '[{"added": {}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (60, '2023-12-09 16:18:36.430361+02', '2', '[A] Christos Borakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (61, '2023-12-09 16:18:56.366348+02', '3', '[A] Alexis Papadakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (63, '2023-12-09 16:22:32.020469+02', '2', '[Eurobank - Alexis Papadakis] first post', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (67, '2023-12-09 16:57:15.550176+02', '2', '[Eurobank] Christos Borakis', 3, '', 9, 1);
INSERT INTO public.django_admin_log VALUES (75, '2023-12-09 17:10:04.947609+02', '1', '[Telemarketing] administrated by George Papadakis', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (78, '2023-12-09 17:11:24.195841+02', '2', '[Eurobank - Alexis Papadakis] first post', 3, '', 16, 1);
INSERT INTO public.django_admin_log VALUES (79, '2023-12-09 17:11:30.45926+02', '3', '[A] Alexis Papadakis -> Eurobank', 3, '', 17, 1);
INSERT INTO public.django_admin_log VALUES (80, '2023-12-09 17:11:34.735227+02', '1', '[A] George Papadakis -> Telemarketing', 3, '', 17, 1);
INSERT INTO public.django_admin_log VALUES (81, '2023-12-09 17:11:54.465945+02', '12', '[P] George Papadakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (82, '2023-12-09 17:11:59.453101+02', '13', '[P] Christos Borakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (83, '2023-12-09 17:12:03.906109+02', '14', '[P] Alexis Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (84, '2023-12-09 17:12:10.679643+02', '14', '[A] Alexis Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (85, '2023-12-09 17:12:16.16489+02', '13', '[A] Christos Borakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (86, '2023-12-09 17:12:18.775483+02', '12', '[A] George Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (87, '2023-12-09 17:12:26.002623+02', '13', '[Eurobank] administrated by Christos Borakis', 1, '[{"added": {}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (95, '2023-12-09 17:34:37.142759+02', '15', '[P] George Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (96, '2023-12-09 17:34:41.93506+02', '16', '[P] Christos Borakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (97, '2023-12-09 17:34:47.110232+02', '17', '[P] Alexis Papadakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (98, '2023-12-09 17:34:58.323092+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (99, '2023-12-09 17:35:01.291764+02', '16', '[A] Christos Borakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (100, '2023-12-09 17:35:03.839341+02', '15', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (108, '2023-12-09 17:46:15.967155+02', '11', '[Eurobank] administrated by Alexis Papadakis', 1, '[{"added": {}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (109, '2023-12-09 17:46:25.727446+02', '12', '[Telemarketing] administrated by Christos Borakis', 1, '[{"added": {}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (110, '2023-12-09 17:46:44.426875+02', '12', '[Telemarketing - Christos Borakis] FIrst post of december', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (116, '2023-12-11 13:26:41.970748+02', '11', '[Telemarketing] George Papadakis', 3, '', 9, 1);
INSERT INTO public.django_admin_log VALUES (119, '2023-12-11 13:38:44.189467+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (120, '2023-12-11 13:38:54.473093+02', '16', '[A] Christos Borakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (121, '2023-12-11 13:39:17.974082+02', '15', '[A] George Papadakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (122, '2023-12-11 13:39:43.074839+02', '2', '[Telemarketing] Christos Borakis', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (123, '2023-12-11 13:39:47.006267+02', '4', '[Telemarketing] George Papadakis', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (124, '2023-12-11 13:39:49.952805+02', '1', '[Eurobank] Alexis Papadakis', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (125, '2023-12-11 13:40:05.410287+02', '13', '[Telemarketing - Christos Borakis] Good morning', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (126, '2023-12-11 13:40:27.707736+02', '14', '[Telemarketing - George Papadakis] Hello to everyone', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (127, '2023-12-11 13:40:52.918961+02', '15', '[Eurobank - Alexis Papadakis] New Weekend with new project', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (128, '2023-12-11 13:41:09.902827+02', '4', '[Telemarketing] George Papadakis', 3, '', 9, 1);
INSERT INTO public.django_admin_log VALUES (129, '2023-12-11 13:50:15.381019+02', '15', '[A] George Papadakis -> Telemarketing', 3, '', 17, 1);
INSERT INTO public.django_admin_log VALUES (130, '2023-12-11 13:51:09.250102+02', '17', '[D] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (131, '2023-12-11 13:51:19.983359+02', '16', '[A] Christos Borakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (132, '2023-12-11 13:51:28.203607+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (133, '2023-12-11 13:56:24.933964+02', '17', '[Eurobank - Alexis Papadakis] first', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (134, '2023-12-11 13:56:34.115878+02', '6', '[Eurobank] Alexis Papadakis', 3, '', 9, 1);
INSERT INTO public.django_admin_log VALUES (135, '2023-12-11 13:56:44.334516+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (136, '2023-12-11 14:14:58.597195+02', '18', '[Telemarketing - Christos Borakis] firs tpost', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (137, '2023-12-11 14:15:14.664176+02', '1', 'PostPrivateLikes object (1)', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (138, '2023-12-11 14:25:28.923574+02', '18', '[A] George Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (139, '2023-12-11 14:25:48.22805+02', '1', '[Telemarketing - firs tpost] liked by Christos Borakis', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (140, '2023-12-11 14:25:51.591945+02', '2', '[Telemarketing - firs tpost] liked by George Papadakis', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (142, '2023-12-11 14:31:25.088536+02', '18', '[D] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (143, '2023-12-11 14:32:05.31843+02', '18', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (144, '2023-12-11 14:32:11.272503+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (145, '2023-12-11 14:32:15.677085+02', '16', '[A] Christos Borakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (146, '2023-12-11 14:32:21.538157+02', '17', '[D] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (147, '2023-12-11 14:35:46.987789+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (148, '2023-12-11 14:35:53.223987+02', '18', '[A] George Papadakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (149, '2023-12-11 14:35:56.518351+02', '16', '[A] Christos Borakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (150, '2023-12-11 14:36:43.545827+02', '17', '[D] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (151, '2023-12-11 14:37:32.785736+02', '18', '[A] George Papadakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (152, '2023-12-11 14:37:35.657246+02', '17', '[A] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (153, '2023-12-11 14:37:37.352434+02', '16', '[A] Christos Borakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (154, '2023-12-11 14:38:43.667817+02', '17', '[D] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (155, '2023-12-11 14:40:07.787285+02', '17', '[D] Alexis Papadakis -> Eurobank', 3, '', 17, 1);
INSERT INTO public.django_admin_log VALUES (156, '2023-12-11 14:40:16.602635+02', '18', '[A] George Papadakis -> Telemarketing', 3, '', 17, 1);
INSERT INTO public.django_admin_log VALUES (157, '2023-12-11 14:40:47.470479+02', '20', '[P] George Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (158, '2023-12-11 14:43:10.742049+02', '20', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (159, '2023-12-11 14:43:21.670753+02', '21', '[A] Christos Borakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (160, '2023-12-11 14:47:26.489523+02', '23', '[P] Christos Borakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (161, '2023-12-11 14:48:18.920114+02', '23', '[A] Christos Borakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (162, '2023-12-11 14:55:17.780934+02', '26', '[P] George Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (163, '2023-12-11 15:00:04.641614+02', '26', '[P] George Papadakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (164, '2023-12-11 15:00:11.678273+02', '26', '[D] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (165, '2023-12-11 15:07:21.86297+02', '26', '[D] George Papadakis -> Telemarketing', 2, '[]', 17, 1);
INSERT INTO public.django_admin_log VALUES (166, '2023-12-11 15:08:38.115071+02', '26', '[A] George Papadakis -> Telemarketing', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (167, '2023-12-11 15:12:14.027659+02', '30', '[P] Alexis Papadakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (168, '2023-12-11 15:15:43.591989+02', '30', '[A] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (169, '2023-12-11 15:15:48.92527+02', '41', '[Eurobank] Alexis Papadakis', 3, '', 9, 1);
INSERT INTO public.django_admin_log VALUES (170, '2023-12-11 15:16:59.69613+02', '31', '[P] Alexis Papadakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (171, '2023-12-11 15:17:05.302287+02', '31', '[A] Alexis Papadakis -> Eurobank', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (172, '2023-12-11 15:17:15.780798+02', '31', '[A] Alexis Papadakis -> Eurobank', 3, '', 17, 1);
INSERT INTO public.django_admin_log VALUES (173, '2023-12-12 12:07:53.709758+02', '3', 'Greece (Kentro 43 Chania)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (174, '2023-12-12 12:08:11.289771+02', '3', 'TestCompany', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (175, '2023-12-12 12:08:34.848242+02', '7', 'petros@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (176, '2023-12-12 12:08:54.40052+02', '7', 'Petros Petrakis', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (177, '2023-12-12 12:08:58.332923+02', '32', '[P] Petros Petrakis -> TestCompany', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (178, '2023-12-12 12:09:02.477659+02', '32', '[A] Petros Petrakis -> TestCompany', 2, '[{"changed": {"fields": ["Status"]}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (179, '2023-12-12 12:09:12.666374+02', '19', '[TestCompany - Petros Petrakis] safsafsa', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (180, '2023-12-12 12:11:00.92992+02', '3', '[TestCompany - safsafsa] liked by Petros Petrakis', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (181, '2023-12-12 12:11:08.476888+02', '3', 'TestCompany', 3, '', 7, 1);
INSERT INTO public.django_admin_log VALUES (182, '2023-12-12 12:11:38.363619+02', '20', '[Eurobank - Christos Borakis] dsad', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (183, '2023-12-12 12:11:44.814664+02', '4', '[Eurobank - dsad] liked by Christos Borakis', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (184, '2023-12-12 12:11:48.834986+02', '20', '[Eurobank - Christos Borakis] dsad', 3, '', 16, 1);
INSERT INTO public.django_admin_log VALUES (185, '2023-12-12 12:11:58.767353+02', '21', '[Telemarketing - George Papadakis] safsa', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (186, '2023-12-12 12:12:08.710957+02', '33', '[A] Alexis Papadakis -> Telemarketing', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (187, '2023-12-12 12:12:16.530375+02', '34', '[A] Petros Petrakis -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (188, '2023-12-12 12:20:14.288561+02', '6', 'markos@gmail.com', 3, '', 3, 1);
INSERT INTO public.django_admin_log VALUES (189, '2023-12-12 12:20:24.551662+02', '8', 'test@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (190, '2023-12-12 12:20:43.492166+02', '8', 'Test Test', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (191, '2023-12-12 12:21:03.282195+02', '35', '[A] Test Test -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (192, '2023-12-12 12:21:22.353623+02', '22', '[Eurobank - Test Test] test', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (193, '2023-12-12 12:21:28.480133+02', '5', '[Eurobank - test] liked by Test Test', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (194, '2023-12-12 12:21:35.615783+02', '8', 'test@gmail.com', 3, '', 3, 1);
INSERT INTO public.django_admin_log VALUES (195, '2023-12-12 12:46:53.368166+02', '1', '[Christos Borakis] First public post', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (196, '2023-12-12 12:49:05.913562+02', '1', '[Christos Borakis - First public post] liked by Alexis Papadakis', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (197, '2023-12-12 13:14:13.100732+02', '1', '[[Telemarketing] George Papadakis - safsa] comments [A] Alexis Papadakis -> Telemarketing "gdfgdf"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (198, '2023-12-12 13:15:43.229943+02', '1', '[Christos Borakis - First public post] comments Christos Borakis "great news"', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (199, '2023-12-12 13:15:53.257213+02', '2', '[Christos Borakis - First public post] comments George Papadakis "cool"', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (200, '2023-12-14 12:47:50.758665+02', '1', '[P] George Papadakis -> Alexis Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (201, '2023-12-14 12:48:22.413379+02', '1', '[P] George Papadakis -> Alexis Papadakis', 2, '[]', 25, 1);
INSERT INTO public.django_admin_log VALUES (203, '2023-12-14 12:49:29.628756+02', '1', '[P] George Papadakis -> Alexis Papadakis', 3, '', 25, 1);
INSERT INTO public.django_admin_log VALUES (204, '2023-12-14 12:49:35.430525+02', '2', '[P] Christos Borakis -> Petros Petrakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (206, '2023-12-14 12:53:55.017213+02', '1', '[P] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (207, '2023-12-14 13:05:45.685765+02', '1', '[P] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (208, '2023-12-14 13:05:51.639723+02', '2', '[P] George Papadakis -> Alexis Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (209, '2023-12-14 13:05:58.98524+02', '3', '[P] George Papadakis -> George Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (210, '2023-12-14 13:06:02.714329+02', '3', '[P] George Papadakis -> George Papadakis', 3, '', 25, 1);
INSERT INTO public.django_admin_log VALUES (211, '2023-12-14 13:06:05.267999+02', '2', '[P] George Papadakis -> Alexis Papadakis', 3, '', 25, 1);
INSERT INTO public.django_admin_log VALUES (212, '2023-12-14 13:06:07.324546+02', '1', '[P] George Papadakis -> Christos Borakis', 3, '', 25, 1);
INSERT INTO public.django_admin_log VALUES (214, '2023-12-14 13:16:35.006718+02', '5', '[P] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (217, '2023-12-15 13:19:12.201608+02', '5', '[P] George Papadakis -> Christos Borakis', 3, '', 25, 1);
INSERT INTO public.django_admin_log VALUES (218, '2023-12-15 13:20:28.3591+02', '6', '[P] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (219, '2023-12-15 13:20:34.981271+02', '7', '[P] Christos Borakis -> George Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (220, '2023-12-15 13:20:35.953286+02', '1', '[[P] George Papadakis -> Christos Borakis] friends with [P] Christos Borakis -> George Papadakis', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (221, '2023-12-15 13:20:50.981464+02', '1', '[[P] George Papadakis -> Christos Borakis] friends with [P] Christos Borakis -> George Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (222, '2023-12-15 13:28:37.778652+02', '1', '[P] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (223, '2023-12-15 13:28:42.944756+02', '1', '[A] George Papadakis -> Christos Borakis', 2, '[{"changed": {"fields": ["Status"]}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (224, '2023-12-15 13:28:59.460996+02', '1', '[George Papadakis] friends with Christos Borakis', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (225, '2023-12-15 14:07:16.716175+02', '1', '[A] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (226, '2023-12-15 14:07:36.542598+02', '1', '[George Papadakis] friends with Christos Borakis', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (227, '2023-12-15 14:09:32.955362+02', '1', '[A] George Papadakis -> Christos Borakis', 3, '', 25, 1);
INSERT INTO public.django_admin_log VALUES (228, '2023-12-15 14:09:36.94501+02', '1', '[George Papadakis] friends with Christos Borakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (229, '2023-12-15 14:09:45.191675+02', '2', '[A] George Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (230, '2023-12-15 14:12:42.078164+02', '3', '[Christos Borakis] friends with George Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (231, '2023-12-15 14:15:02.595593+02', '2', '[P] George Papadakis -> Christos Borakis', 2, '[{"changed": {"fields": ["Status"]}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (232, '2023-12-15 14:15:07.510423+02', '2', '[A] George Papadakis -> Christos Borakis', 2, '[{"changed": {"fields": ["Status"]}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (233, '2023-12-15 14:15:48.805067+02', '5', '[Christos Borakis] friends with George Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (234, '2023-12-15 14:15:53.061204+02', '2', '[P] George Papadakis -> Christos Borakis', 2, '[{"changed": {"fields": ["Status"]}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (235, '2023-12-15 14:15:57.425319+02', '2', '[A] George Papadakis -> Christos Borakis', 2, '[{"changed": {"fields": ["Status"]}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (236, '2023-12-16 14:43:18.879643+02', '1', '[[George Papadakis] friends with Christos Borakis->[Christos Borakis] friends with George Papadakis] Hi nice to meet u', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (237, '2023-12-16 14:44:02.109818+02', '2', '[Christos Borakis->George Papadakis] hi me too', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (238, '2023-12-16 14:44:28.49691+02', '2', '[Christos Borakis->Christos Borakis] hi me too', 2, '[{"changed": {"fields": ["Sender", "Receiver"]}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (239, '2023-12-16 14:44:51.470709+02', '3', '[A] Petros Petrakis -> Alexis Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (240, '2023-12-16 14:45:20.063676+02', '3', '[Petros Petrakis->Petros Petrakis] Hello enjoy your weekend my friend', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (241, '2023-12-16 15:04:15.098488+02', '4', '[Petros Petrakis->Christos Borakis] good morning', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (242, '2023-12-16 15:04:23.514335+02', '5', '[Christos Borakis->Petros Petrakis] hey', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (243, '2023-12-16 15:06:38.833996+02', '6', '[Petros Petrakis->Christos Borakis] what''s up', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (244, '2023-12-16 15:11:33.876791+02', '6', '[Petros Petrakis->Christos Borakis] what''s up', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (245, '2023-12-16 15:11:36.331342+02', '5', '[Christos Borakis->Petros Petrakis] hey', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (246, '2023-12-16 15:11:38.945928+02', '4', '[Petros Petrakis->Christos Borakis] good morning', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (247, '2023-12-16 15:11:41.191433+02', '3', '[Petros Petrakis->Alexis Papadakis] Hello enjoy your weekend my friend', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (248, '2023-12-16 15:11:43.981059+02', '2', '[Christos Borakis->George Papadakis] hi me too', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (249, '2023-12-16 15:11:46.650658+02', '1', '[George Papadakis->Christos Borakis] Hi nice to meet u', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (250, '2023-12-16 15:13:35.047015+02', '7', '[Christos Borakis->George Papadakis] hey', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (251, '2023-12-16 15:13:44.98202+02', '8', '[Christos Borakis->George Papadakis] hi', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (252, '2023-12-16 15:14:02.013337+02', '9', '[George Papadakis->Christos Borakis] whats up', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (253, '2023-12-16 15:14:32.360396+02', '4', '[A] Alexis Papadakis -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (254, '2023-12-16 15:14:55.417386+02', '10', '[Christos Borakis->Alexis Papadakis] aaa', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (255, '2023-12-16 15:15:04.162947+02', '10', '[Christos Borakis->Alexis Papadakis] aaa', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (256, '2023-12-16 15:15:59.433387+02', '11', '[Christos Borakis->Alexis Papadakis] fdgdfgdf', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (257, '2023-12-16 15:17:16.861257+02', '12', '[Alexis Papadakis->Christos Borakis] fdg', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (258, '2023-12-16 15:18:17.300805+02', '13', '[Alexis Papadakis->Christos Borakis] dasda', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (259, '2023-12-16 15:18:32.396194+02', '13', '[Alexis Papadakis->Christos Borakis] dasda', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (260, '2023-12-16 15:18:35.009781+02', '12', '[Alexis Papadakis->Christos Borakis] fdg', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (261, '2023-12-16 15:18:37.756398+02', '11', '[Christos Borakis->Alexis Papadakis] fdgdfgdf', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (262, '2023-12-16 15:18:53.02875+02', '14', '[Alexis Papadakis->Christos Borakis] aaa', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (263, '2023-12-16 15:18:57.695166+02', '14', '[Alexis Papadakis->Christos Borakis] aaa', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (264, '2023-12-16 15:30:47.601098+02', '15', '[Alexis Papadakis->Christos Borakis] dsfsd', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (265, '2023-12-16 15:30:50.968856+02', '15', '[Alexis Papadakis->Christos Borakis] dsfsd', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (266, '2023-12-16 15:31:08.155365+02', '16', '[Alexis Papadakis->Christos Borakis] correct', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (267, '2023-12-16 15:31:17.742174+02', '17', '[Alexis Papadakis->Christos Borakis] wrong', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (268, '2023-12-16 15:31:23.574483+02', '17', '[Alexis Papadakis->Christos Borakis] wrong', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (269, '2023-12-16 15:31:26.63517+02', '16', '[Alexis Papadakis->Christos Borakis] correct', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (270, '2023-12-16 15:33:25.323843+02', '18', '[Alexis Papadakis->Christos Borakis] wrong', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (271, '2023-12-16 15:33:34.387915+02', '18', '[Alexis Papadakis->Christos Borakis] wrong', 2, '[{"changed": {"fields": ["Receiver"]}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (272, '2023-12-16 15:39:28.261199+02', '18', '[Alexis Papadakis->Christos Borakis] wrong', 2, '[{"changed": {"fields": ["Receiver"]}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (273, '2023-12-16 15:39:40.144077+02', '18', '[Alexis Papadakis->Christos Borakis] right', 2, '[{"changed": {"fields": ["Receiver", "Message"]}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (274, '2023-12-16 15:39:46.801603+02', '18', '[Alexis Papadakis->Christos Borakis] right', 2, '[]', 27, 1);
INSERT INTO public.django_admin_log VALUES (275, '2023-12-16 15:39:55.271683+02', '18', '[Alexis Papadakis->Christos Borakis] wrong', 2, '[{"changed": {"fields": ["Receiver", "Message"]}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (276, '2023-12-16 15:40:49.189641+02', '18', '[Alexis Papadakis->Christos Borakis] right', 2, '[{"changed": {"fields": ["Receiver", "Message"]}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (277, '2023-12-19 14:11:26.653259+02', '1', 'Group Chat[Eurobank | First eurobank group]', 1, '[{"added": {}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (278, '2023-12-19 14:13:10.465242+02', '1', 'Group Chat[Eurobank | First eurobank group] admins by Christos Borakis', 1, '[{"added": {}}]', 29, 1);
INSERT INTO public.django_admin_log VALUES (279, '2023-12-19 14:13:48.365423+02', '2', 'Group Chat[Eurobank | First eurobank group] member -> Christos Borakis', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log VALUES (280, '2023-12-19 14:13:52.604906+02', '2', 'Group Chat[Eurobank | First eurobank group] member -> Christos Borakis', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (281, '2023-12-19 14:13:58.935541+02', '3', 'Group Chat[Eurobank | First eurobank group] member -> Petros Petrakis', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log VALUES (282, '2023-12-20 12:46:39.89689+02', '1', '[Telemarketing|Start up project of Telemarketing] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (283, '2023-12-20 12:47:39.609475+02', '1', '[Telemarketing|Start up project of Telemarketing]  User Authentication', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (284, '2023-12-20 12:47:58.405591+02', '2', '[Telemarketing|Start up project of Telemarketing]  Task Creation and Assignment', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (285, '2023-12-20 12:54:08.474365+02', '2', '[Telemarketing|Start up project of Telemarketing]  Task Creation and Assignment', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (286, '2023-12-20 12:55:08.849464+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (287, '2023-12-20 12:55:25.949449+02', '21', '[Telemarketing - George Papadakis] safsa', 2, '[{"changed": {"fields": ["Image"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (288, '2023-12-20 12:56:44.33743+02', '21', '[Telemarketing - George Papadakis] safsa', 2, '[{"changed": {"fields": ["Image"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (289, '2023-12-20 12:56:49.25255+02', '21', '[Telemarketing - George Papadakis] safsa', 2, '[{"changed": {"fields": ["Image"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (290, '2023-12-20 12:56:54.835571+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (291, '2023-12-20 12:56:59.340956+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (292, '2023-12-20 12:57:31.952322+02', '2', '[Telemarketing|Start up project of Telemarketing]  Task Creation and Assignment', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (293, '2023-12-20 12:57:37.79219+02', '1', '[Telemarketing|Start up project of Telemarketing]  User Authentication', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (294, '2023-12-20 12:58:41.050159+02', '2', '[Eurobank|Online Learning Platform] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (295, '2023-12-20 12:59:01.173029+02', '3', '[Eurobank|Online Learning Platform]  Instructor Dashboard', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (296, '2023-12-20 12:59:19.458329+02', '3', '[Eurobank|Online Learning Platform]  Instructor Dashboard', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (297, '2023-12-20 13:26:12.407088+02', '21', '[Telemarketing - George Papadakis] safsa', 2, '[{"changed": {"fields": ["Image"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (298, '2023-12-20 13:26:29.986705+02', '21', '[Telemarketing - George Papadakis] safsa', 2, '[{"changed": {"fields": ["Image"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (299, '2023-12-20 13:26:35.725729+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (300, '2023-12-20 13:26:41.759594+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (301, '2023-12-20 13:26:49.893388+02', '3', '[Eurobank|Online Learning Platform]  Instructor Dashboard', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (302, '2023-12-20 13:26:56.97238+02', '3', '[Eurobank|Online Learning Platform]  Instructor Dashboard', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (303, '2023-12-20 13:27:04.576822+02', '2', '[Telemarketing|Start up project of Telemarketing]  Task Creation and Assignment', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (304, '2023-12-20 13:27:07.980337+02', '1', '[Telemarketing|Start up project of Telemarketing]  User Authentication', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (305, '2023-12-20 13:27:17.28368+02', '1', '[Telemarketing|Start up project of Telemarketing]  User Authentication', 2, '[{"changed": {"fields": ["File"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (306, '2023-12-20 13:28:28.29595+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (307, '2023-12-20 13:28:36.413003+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (308, '2023-12-20 13:30:19.14236+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (309, '2023-12-20 13:30:25.861615+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (310, '2023-12-20 13:31:00.387843+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (311, '2023-12-20 13:31:05.384564+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (312, '2023-12-20 13:31:18.525471+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (313, '2023-12-20 13:31:22.7749+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (314, '2023-12-20 13:32:10.501469+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (315, '2023-12-20 13:32:14.757876+02', '1', '[Christos Borakis] First public post', 2, '[{"changed": {"fields": ["Image"]}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (316, '2023-12-20 13:32:49.398619+02', '2', '[Alexis Papadakis] Merry XMAS', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (317, '2023-12-20 13:52:17.995304+02', '1', 'Christos Borakis -> [Eurobank|Online Learning Platform]  Instructor Dashboard', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (318, '2023-12-21 13:29:21.252333+02', '1', '[Eurobank|Online Learning Platform]  admins by Christos Borakis', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log VALUES (319, '2023-12-21 13:29:32.871101+02', '1', '[Eurobank|Online Learning Platform]  admins by Christos Borakis', 3, '', 34, 1);
INSERT INTO public.django_admin_log VALUES (320, '2023-12-21 13:29:37.434135+02', '2', '[Eurobank|Online Learning Platform]  admins by Petros Petrakis', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log VALUES (321, '2023-12-21 13:29:53.461399+02', '1', 'Christos Borakis -> [Eurobank|Online Learning Platform]  Instructor Dashboard', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (322, '2023-12-21 13:30:11.533648+02', '2', 'Christos Borakis -> [Eurobank|Online Learning Platform]  Instructor Dashboard', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (323, '2023-12-21 13:30:17.743069+02', '1', 'Christos Borakis -> [Eurobank|Online Learning Platform]  Instructor Dashboard', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (324, '2023-12-21 13:30:38.111695+02', '3', 'Petros Petrakis -> [Eurobank|Online Learning Platform]  Instructor Dashboard', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (325, '2023-12-21 13:33:32.644516+02', '3', '[Eurobank|Online Learning Platform] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (326, '2023-12-21 13:33:39.987889+02', '3', '[Eurobank|Online Learning Platform] ', 3, '', 32, 1);
INSERT INTO public.django_admin_log VALUES (327, '2023-12-21 13:49:05.940714+02', '4', 'George Papadakis -> [Telemarketing|Start up project of Telemarketing]  User Authentication', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (328, '2023-12-21 13:49:19.640335+02', '5', 'Alexis Papadakis -> [Telemarketing|Start up project of Telemarketing]  User Authentication', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (329, '2023-12-21 13:49:29.638247+02', '3', 'Petros Petrakis -> [Eurobank|Online Learning Platform]  Instructor Dashboard', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (330, '2023-12-21 13:49:32.639927+02', '5', 'Alexis Papadakis -> [Telemarketing|Start up project of Telemarketing]  User Authentication', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (331, '2023-12-21 13:50:00.661143+02', '6', 'Alexis Papadakis -> [Telemarketing|Start up project of Telemarketing]  User Authentication', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (332, '2023-12-21 13:52:22.640048+02', '6', 'Alexis Papadakis -> [Telemarketing|Start up project of Telemarketing]  User Authentication', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (333, '2023-12-26 16:02:34.775398+02', '21', '[Telemarketing - George Papadakis] First Post', 2, '[{"changed": {"fields": ["Title", "Body"]}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (334, '2023-12-26 16:04:50.944949+02', '9', 'dimitra@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (335, '2023-12-26 16:05:20.298031+02', '9', 'Dimitra Iwannou', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (336, '2023-12-26 16:16:50.902213+02', '4', 'Greece (Ermou 38 Athens)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (337, '2023-12-26 16:34:20.329444+02', '4', 'TechVerse Solutions', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (338, '2023-12-26 16:34:36.528441+02', '36', '[A] Dimitra Iwannou -> TechVerse Solutions', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (339, '2023-12-26 16:35:47.055748+02', '23', '[TechVerse Solutions - Dimitra Iwannou] New member', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (340, '2023-12-26 16:36:07.598141+02', '6', '[TechVerse Solutions - New member] liked by Dimitra Iwannou', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (341, '2023-12-26 16:36:28.724527+02', '1', '[[Telemarketing] George Papadakis - First Post] comments Alexis Papadakis "Great"', 2, '[{"changed": {"fields": ["Comment"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (342, '2023-12-26 16:36:47.18827+02', '2', '[[TechVerse Solutions] Dimitra Iwannou - New member] comments Dimitra Iwannou "!!!"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (343, '2023-12-26 17:17:18.001003+02', '2', 'Group Chat[Telemarketing | New Project]', 1, '[{"added": {}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (344, '2023-12-26 17:17:32.486287+02', '4', 'Group Chat[Telemarketing | New Project] member -> George Papadakis', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log VALUES (345, '2023-12-26 17:17:38.572665+02', '5', 'Group Chat[Telemarketing | New Project] member -> George Papadakis', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log VALUES (346, '2023-12-26 17:18:28.08286+02', '5', 'Group Chat[Telemarketing | New Project] member -> George Papadakis', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (347, '2023-12-26 17:18:36.394742+02', '6', 'Group Chat[Telemarketing | New Project] member -> Alexis Papadakis', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log VALUES (348, '2023-12-26 17:27:15.447674+02', '1', 'Group Chat[Eurobank | First eurobank group] Group Chat[Eurobank | First eurobank group] member -> Christos Borakis -> dsdsfs', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (349, '2023-12-26 17:31:26.705113+02', '1', '2023-12-26 [Eurobank | First eurobank group] -> Christos Borakis-> dsdsfs', 3, '', 35, 1);
INSERT INTO public.django_admin_log VALUES (350, '2023-12-26 17:32:38.418471+02', '2', '2023-12-26 15:32:38.369460+00:00 [Eurobank | First eurobank group] -> Christos Borakis-> Hello everyone', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (351, '2023-12-26 17:44:21.933318+02', '3', '2023-12-26 15:44:21.916314+00:00 [Eurobank | First eurobank group] -> Petros Petrakis-> Hello guys!!', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (352, '2023-12-26 17:45:00.050557+02', '3', '2023-12-26 [Eurobank | First eurobank group] -> Petros Petrakis-> Hello guys!!', 3, '', 35, 1);
INSERT INTO public.django_admin_log VALUES (353, '2023-12-26 17:45:10.818785+02', '4', '2023-12-26 15:45:10.809783+00:00 [Eurobank | First eurobank group] -> Petros Petrakis-> Helo guys', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (354, '2023-12-26 17:46:21.754394+02', '2', '2023-12-26 [Eurobank | First eurobank group] -> Christos Borakis-> Hello everyone', 3, '', 35, 1);
INSERT INTO public.django_admin_log VALUES (355, '2023-12-26 17:46:24.835093+02', '4', '2023-12-26 [Eurobank | First eurobank group] -> Petros Petrakis-> Helo guys', 3, '', 35, 1);
INSERT INTO public.django_admin_log VALUES (356, '2023-12-26 17:46:50.267853+02', '5', '2023-12-26 15:46:50.256851+00:00 [Eurobank | First eurobank group] -> Christos Borakis-> hi', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (357, '2023-12-26 17:51:31.635289+02', '5', '2023-12-26 15:51:31.624286+00:00 [Eurobank | First eurobank group] -> Christos Borakis-> hi', 2, '[]', 35, 1);
INSERT INTO public.django_admin_log VALUES (358, '2023-12-26 17:52:29.151079+02', '18', '[Alexis Papadakis->Christos Borakis] right', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (359, '2023-12-26 17:52:31.860692+02', '9', '[George Papadakis->Christos Borakis] whats up', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (360, '2023-12-26 17:52:33.977175+02', '8', '[Christos Borakis->George Papadakis] hi', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (361, '2023-12-26 17:52:36.148667+02', '7', '[Christos Borakis->George Papadakis] hey', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (362, '2023-12-26 17:53:25.130144+02', '19', '[George Papadakis->Christos Borakis] Hey', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (363, '2023-12-26 17:53:33.835184+02', '20', '[Christos Borakis->George Papadakis] Hello friend', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (364, '2023-12-26 17:56:22.744705+02', '21', '2023-12-26 15:56:22.742704+00:00[Christos Borakis->Alexis Papadakis] HEY THANKS FOR THE ACCEPT', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (365, '2023-12-26 17:57:23.771411+02', '6', '2023-12-26 15:57:23.761409+00:00 [Eurobank | First eurobank group] -> Petros Petrakis-> Hello team!!!', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (366, '2023-12-26 17:57:39.271232+02', '7', '2023-12-26 15:57:39.261229+00:00 [Telemarketing | New Project] -> George Papadakis-> Im so anxious about the new project...', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (367, '2023-12-26 17:57:47.059066+02', '8', '2023-12-26 15:57:47.051064+00:00 [Telemarketing | New Project] -> Alexis Papadakis-> Yes me too', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (368, '2023-12-26 17:58:01.168793+02', '9', '2023-12-26 15:58:01.159791+00:00 [Telemarketing | New Project] -> George Papadakis-> it sounds difficult', 1, '[{"added": {}}]', 35, 1);
INSERT INTO public.django_admin_log VALUES (369, '2023-12-27 13:01:06.794289+02', '4', 'TechVerse Solutions', 2, '[{"changed": {"fields": ["Image"]}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (370, '2023-12-27 13:09:26.371111+02', '25', '[Eurobank] Christos Borakis', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (371, '2023-12-27 13:10:51.698446+02', '3', '[Telemarketing | Challenges of Remote Project Management]', 1, '[{"added": {}}]', 36, 1);
INSERT INTO public.django_admin_log VALUES (372, '2023-12-27 13:11:03.130735+02', '4', '[TechVerse Solutions | Sustainable IT Project Developmen]', 1, '[{"added": {}}]', 36, 1);
INSERT INTO public.django_admin_log VALUES (373, '2023-12-27 13:11:18.380873+02', '5', '[Eurobank | Big Data Analytics]', 1, '[{"added": {}}]', 36, 1);
INSERT INTO public.django_admin_log VALUES (374, '2023-12-27 13:39:20.13472+02', '7', '[Telemarketing - First Post] liked by Alexis Papadakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (375, '2023-12-27 13:40:44.359751+02', '2', '[Alexis Papadakis - Merry XMAS] liked by George Papadakis', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (376, '2023-12-27 13:40:49.999853+02', '3', '[Alexis Papadakis - Merry XMAS] liked by Christos Borakis', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (377, '2023-12-27 13:40:53.427115+02', '4', '[Alexis Papadakis - Merry XMAS] liked by Dimitra Iwannou', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (378, '2023-12-27 15:03:52.40825+02', '2', 'George Papadakis Harvard University', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (379, '2023-12-27 15:04:16.447726+02', '3', 'Alexis Papadakis University of Oxford', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (380, '2023-12-27 15:04:30.939867+02', '4', 'Petros Petrakis Stanford University', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (381, '2023-12-27 15:04:49.352145+02', '5', 'Dimitra Iwannou ETH Zurich (Swiss Federal Institute of Technology)', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (382, '2023-12-27 15:05:06.022268+02', '6', 'Christos Borakis ETH Zurich (Swiss Federal Institute of Technology)', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (383, '2023-12-27 15:05:44.968799+02', '6', 'Christos Borakis ETH Zurich (Swiss Federal Institute of Technology)', 2, '[{"changed": {"fields": ["Graduation"]}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (384, '2023-12-27 15:07:47.481224+02', '2', 'Alexis Papadakis 16 Γενικό Λύκειο Αττικής', 1, '[{"added": {}}]', 6, 1);
INSERT INTO public.django_admin_log VALUES (385, '2023-12-27 15:09:04.516731+02', '10', 'RodriguezEmily@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (386, '2023-12-27 15:10:16.30615+02', '10', 'Emily Rodriguez', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (387, '2023-12-27 15:10:32.330456+02', '11', 'AlexanderPatel@yahoo.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (388, '2023-12-27 15:10:51.509334+02', '11', 'Alexander Patel', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (389, '2023-12-27 15:11:02.72862+02', '12', 'SofiaChang@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (390, '2023-12-27 15:11:24.267738+02', '12', 'Sofia Chang', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (391, '2023-12-27 15:11:35.344676+02', '13', 'JavierFernandez@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (392, '2023-12-27 15:11:53.53737+02', '13', 'Javier Fernandez', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (393, '2023-12-27 15:12:19.485042+02', '14', 'AishaKhan@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (394, '2023-12-27 15:12:38.811474+02', '14', 'Aisha Khan', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (395, '2023-12-27 15:16:10.069629+02', '7', 'Emily Rodriguez Stanford University', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (396, '2023-12-27 15:16:21.730552+02', '8', 'Alexander Patel Harvard University', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (397, '2023-12-27 15:16:38.103143+02', '9', 'Sofia Chang Massachusetts Institute of Technology (MIT)', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (398, '2023-12-27 15:17:08.924074+02', '10', 'Javier Fernandez University of Oxford', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (399, '2023-12-27 15:17:31.475404+02', '11', 'Aisha Khan Massachusetts Institute of Technology (MIT)', 1, '[{"added": {}}]', 5, 1);
INSERT INTO public.django_admin_log VALUES (400, '2023-12-27 15:19:30.231402+02', '5', 'USA (123 Innovation Avenue Anytown)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (401, '2023-12-27 15:20:38.127331+02', '5', 'Tech Solutions Inc.', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (402, '2023-12-27 15:21:00.30374+02', '6', 'USA (789 Biomed Plaza Anytown)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (403, '2023-12-27 15:21:23.354809+02', '6', 'BioHealth Pharmaceuticals', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (404, '2023-12-27 15:21:59.551572+02', '7', 'Greece (23 Dionysiou Street Athens)', 1, '[{"added": {}}]', 1, 1);
INSERT INTO public.django_admin_log VALUES (405, '2023-12-27 15:22:17.100506+02', '7', 'Olympus Software Solutions SA', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (406, '2023-12-27 15:22:49.750413+02', '37', '[A] Emily Rodriguez -> Tech Solutions Inc.', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (407, '2023-12-27 15:22:54.255624+02', '38', '[P] Alexander Patel -> Tech Solutions Inc.', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (408, '2023-12-27 15:23:00.911074+02', '39', '[A] Sofia Chang -> BioHealth Pharmaceuticals', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (409, '2023-12-27 15:23:07.081379+02', '40', '[A] Aisha Khan -> BioHealth Pharmaceuticals', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (410, '2023-12-27 15:23:27.135946+02', '50', '[BioHealth Pharmaceuticals] Aisha Khan', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (411, '2023-12-27 15:24:10.772797+02', '44', '[Telemarketing] Alexis Papadakis', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (412, '2023-12-27 15:24:17.171516+02', '48', '[Tech Solutions Inc.] Emily Rodriguez', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (413, '2023-12-27 15:24:20.899366+02', '47', '[TechVerse Solutions] Dimitra Iwannou', 2, '[{"changed": {"fields": ["Is admin"]}}]', 9, 1);
INSERT INTO public.django_admin_log VALUES (414, '2023-12-27 15:24:30.818625+02', '12', '[Christos Borakis] friends with Petros Petrakis', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (415, '2023-12-27 15:24:33.587256+02', '13', '[Alexander Patel] friends with Sofia Chang', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (416, '2023-12-27 15:24:35.728746+02', '14', '[Alexander Patel] friends with Alexis Papadakis', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (417, '2023-12-27 15:24:38.068279+02', '15', '[Dimitra Iwannou] friends with Javier Fernandez', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (418, '2023-12-27 15:24:40.405811+02', '16', '[Javier Fernandez] friends with Aisha Khan', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (419, '2023-12-27 15:24:42.68533+02', '17', '[George Papadakis] friends with Dimitra Iwannou', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (420, '2023-12-27 15:24:44.967851+02', '18', '[Emily Rodriguez] friends with Sofia Chang', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (421, '2023-12-27 15:25:37.879027+02', '18', '[Emily Rodriguez] friends with Sofia Chang', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (422, '2023-12-27 15:25:37.882028+02', '17', '[George Papadakis] friends with Dimitra Iwannou', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (423, '2023-12-27 15:25:37.882028+02', '16', '[Javier Fernandez] friends with Aisha Khan', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (424, '2023-12-27 15:25:37.883028+02', '15', '[Dimitra Iwannou] friends with Javier Fernandez', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (425, '2023-12-27 15:25:37.883028+02', '14', '[Alexander Patel] friends with Alexis Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (426, '2023-12-27 15:25:37.884027+02', '13', '[Alexander Patel] friends with Sofia Chang', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (427, '2023-12-27 15:25:37.884027+02', '12', '[Christos Borakis] friends with Petros Petrakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (428, '2023-12-27 15:25:37.885028+02', '11', '[Christos Borakis] friends with Alexis Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (429, '2023-12-27 15:25:37.885028+02', '10', '[Alexis Papadakis] friends with Christos Borakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (430, '2023-12-27 15:25:37.886028+02', '9', '[Alexis Papadakis] friends with Petros Petrakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (431, '2023-12-27 15:25:37.886028+02', '8', '[Petros Petrakis] friends with Alexis Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (432, '2023-12-27 15:25:37.887029+02', '7', '[Christos Borakis] friends with George Papadakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (433, '2023-12-27 15:25:37.887029+02', '6', '[George Papadakis] friends with Christos Borakis', 3, '', 26, 1);
INSERT INTO public.django_admin_log VALUES (434, '2023-12-27 15:25:46.01488+02', '5', '[A] Dimitra Iwannou -> Alexis Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (435, '2023-12-27 15:25:49.280627+02', '6', '[A] Dimitra Iwannou -> Christos Borakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (436, '2023-12-27 15:25:52.2373+02', '7', '[A] Javier Fernandez -> Alexis Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (437, '2023-12-27 15:25:58.347692+02', '8', '[A] Javier Fernandez -> Petros Petrakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (438, '2023-12-27 15:26:02.24458+02', '9', '[A] Aisha Khan -> Javier Fernandez', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (439, '2023-12-27 15:26:05.865404+02', '10', '[A] Alexander Patel -> Petros Petrakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (440, '2023-12-27 15:26:08.931103+02', '11', '[A] Petros Petrakis -> Aisha Khan', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (441, '2023-12-27 15:26:12.91701+02', '12', '[A] Javier Fernandez -> Dimitra Iwannou', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (442, '2023-12-27 15:26:55.031477+02', '13', '[P] Sofia Chang -> George Papadakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (443, '2023-12-27 15:26:58.670943+02', '14', '[A] Christos Borakis -> Emily Rodriguez', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (444, '2023-12-27 15:27:03.164659+02', '15', '[A] Sofia Chang -> Dimitra Iwannou', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (445, '2023-12-27 15:27:06.28337+02', '16', '[A] George Papadakis -> Petros Petrakis', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (446, '2023-12-27 15:28:25.75046+02', '13', '[A] Sofia Chang -> George Papadakis', 2, '[{"changed": {"fields": ["Status"]}}]', 25, 1);
INSERT INTO public.django_admin_log VALUES (447, '2023-12-27 15:31:06.299386+02', '24', '[Eurobank - Christos Borakis] Welcome New Hires!', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (448, '2023-12-27 15:31:18.318187+02', '25', '[Telemarketing - George Papadakis] Company Event Reminder: Town Hall Meeting', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (449, '2023-12-27 15:31:26.314008+02', '26', '[Eurobank - Petros Petrakis] Volunteer Opportunity: Community Cleanup Day', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (450, '2023-12-27 15:31:40.165688+02', '27', '[BioHealth Pharmaceuticals - Aisha Khan] Employee Spotlight: Meet [Employee Name]', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (451, '2023-12-27 15:31:48.326644+02', '28', '[TechVerse Solutions - Dimitra Iwannou] Tech Tips Tuesday: Cybersecurity Best Practices', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (452, '2023-12-27 15:31:55.545599+02', '29', '[Telemarketing - Alexis Papadakis] Company Wellness Program: Yoga Sessions', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (453, '2023-12-27 15:32:05.700913+02', '30', '[BioHealth Pharmaceuticals - Sofia Chang] Call for Ideas: Office Redesign Project', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (454, '2023-12-27 15:32:14.183846+02', '31', '[Tech Solutions Inc. - Emily Rodriguez] Professional Development Opportunities', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (455, '2023-12-27 15:32:22.638346+02', '32', '[Eurobank - Christos Borakis] Congratulations [Employee Name] on Work Anniversary!', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (456, '2023-12-27 15:32:40.10066+02', '33', '[BioHealth Pharmaceuticals - Sofia Chang] Upcoming Holiday Schedule Reminder', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (457, '2023-12-27 15:34:28.289748+02', '3', '[[Telemarketing] George Papadakis - First Post] comments Alexis Papadakis "Great initiative! Looking forward to seeing the positive impact."', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (458, '2023-12-27 15:34:39.353728+02', '4', '[[Telemarketing] George Papadakis - First Post] comments Alexis Papadakis "Thanks for organizing! I''ll be there to lend a hand."', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (459, '2023-12-27 15:34:47.427762+02', '5', '[[Eurobank] Christos Borakis - Welcome New Hires!] comments Petros Petrakis "Congratulations! Well deserved!"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (460, '2023-12-27 15:34:57.544251+02', '6', '[[Telemarketing] George Papadakis - Company Event Reminder: Town Hall Meeting] comments Alexis Papadakis "What an inspiring story! Thanks for sharing."', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (461, '2023-12-27 15:35:06.37695+02', '7', '[[Eurobank] Petros Petrakis - Volunteer Opportunity: Community Cleanup Day] comments Christos Borakis "Fantastic work! Keep it up!"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (462, '2023-12-27 15:35:16.012145+02', '8', '[[Eurobank] Petros Petrakis - Volunteer Opportunity: Community Cleanup Day] comments Christos Borakis "I''m interested! How can I sign up?"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (463, '2023-12-27 15:35:28.300096+02', '9', '[[TechVerse Solutions] Dimitra Iwannou - Tech Tips Tuesday: Cybersecurity Best Practices] comments Dimitra Iwannou "Impressive achievement! Kudos to the team"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (464, '2023-12-27 15:36:17.81734+02', '10', '[[BioHealth Pharmaceuticals] Sofia Chang - Upcoming Holiday Schedule Reminder] comments Sofia Chang ""This is awesome news! Can''t wait to attend.""', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (465, '2023-12-27 15:36:28.149856+02', '11', '[[Eurobank] Christos Borakis - Congratulations [Employee Name] on Work Anniversary!] comments Petros Petrakis "Wishing everyone a productive meeting!"', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (466, '2023-12-27 15:36:39.74457+02', '12', '[[BioHealth Pharmaceuticals] Sofia Chang - Upcoming Holiday Schedule Reminder] comments Aisha Khan "Count me in! Excited for the event."', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (467, '2023-12-27 15:37:09.574913+02', '8', '[Telemarketing - Company Event Reminder: Town Hall Meeting] liked by George Papadakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (468, '2023-12-27 15:37:14.337999+02', '9', '[Telemarketing - First Post] liked by George Papadakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (469, '2023-12-27 15:37:34.539809+02', '10', '[Eurobank - Welcome New Hires!] liked by Christos Borakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (470, '2023-12-27 15:37:40.337131+02', '11', '[Telemarketing - Company Event Reminder: Town Hall Meeting] liked by Alexis Papadakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (471, '2023-12-27 15:37:51.167994+02', '12', '[Eurobank - Volunteer Opportunity: Community Cleanup Day] liked by Christos Borakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (472, '2023-12-27 15:37:54.597846+02', '13', '[Eurobank - Volunteer Opportunity: Community Cleanup Day] liked by Petros Petrakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (473, '2023-12-27 15:37:58.686481+02', '14', '[BioHealth Pharmaceuticals - Employee Spotlight: Meet [Employee Name]] liked by Aisha Khan', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (474, '2023-12-27 15:38:07.067355+02', '15', '[BioHealth Pharmaceuticals - Employee Spotlight: Meet [Employee Name]] liked by Sofia Chang', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (475, '2023-12-27 15:38:13.484817+02', '16', '[TechVerse Solutions - Tech Tips Tuesday: Cybersecurity Best Practices] liked by Dimitra Iwannou', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (476, '2023-12-27 15:38:17.220669+02', '17', '[Telemarketing - Company Wellness Program: Yoga Sessions] liked by George Papadakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (477, '2023-12-27 15:38:21.541515+02', '18', '[BioHealth Pharmaceuticals - Call for Ideas: Office Redesign Project] liked by Aisha Khan', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (478, '2023-12-27 15:38:26.623672+02', '19', '[Tech Solutions Inc. - Professional Development Opportunities] liked by Emily Rodriguez', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (479, '2023-12-27 15:38:29.488326+02', '20', '[Eurobank - Congratulations [Employee Name] on Work Anniversary!] liked by Petros Petrakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (480, '2023-12-27 15:38:32.80408+02', '21', '[Eurobank - Congratulations [Employee Name] on Work Anniversary!] liked by Christos Borakis', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (481, '2023-12-27 15:38:36.591541+02', '22', '[BioHealth Pharmaceuticals - Upcoming Holiday Schedule Reminder] liked by Aisha Khan', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log VALUES (482, '2023-12-27 15:39:58.89502+02', '3', '[Christos Borakis] "Upcoming Seminar on Financial Planning', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (483, '2023-12-27 15:40:06.22369+02', '4', '[Dimitra Iwannou] Tech Talk: Exploring AI and its Impact', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (484, '2023-12-27 15:40:15.672571+02', '5', '[Alexander Patel] Team Building Day at the Beach!', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (485, '2023-12-27 15:40:26.921913+02', '6', '[Sofia Chang] Volunteer Opportunity: Community Cleanup Drive', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (486, '2023-12-27 15:40:33.801481+02', '7', '[Javier Fernandez] Healthy Living Workshop: Mindfulness and Stress Management', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (487, '2023-12-27 15:41:12.579086+02', '5', '[Christos Borakis - "Upcoming Seminar on Financial Planning] liked by Alexis Papadakis', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (488, '2023-12-27 15:41:15.661789+02', '6', '[Christos Borakis - "Upcoming Seminar on Financial Planning] liked by George Papadakis', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (489, '2023-12-27 15:41:18.859517+02', '7', '[Dimitra Iwannou - Tech Talk: Exploring AI and its Impact] liked by Alexander Patel', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (490, '2023-12-27 15:41:21.975231+02', '8', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] liked by Emily Rodriguez', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (491, '2023-12-27 15:41:24.584825+02', '9', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] liked by Javier Fernandez', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (492, '2023-12-27 15:41:27.299444+02', '10', '[Javier Fernandez - Healthy Living Workshop: Mindfulness and Stress Management] liked by Petros Petrakis', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (493, '2023-12-27 15:41:29.763005+02', '11', '[Alexander Patel - Team Building Day at the Beach!] liked by Emily Rodriguez', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (494, '2023-12-27 15:41:32.278577+02', '12', '[Dimitra Iwannou - Tech Talk: Exploring AI and its Impact] liked by Aisha Khan', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (495, '2023-12-27 15:41:34.897173+02', '13', '[Christos Borakis - "Upcoming Seminar on Financial Planning] liked by Aisha Khan', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (496, '2023-12-27 15:41:36.978648+02', '14', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] liked by Christos Borakis', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (497, '2023-12-27 15:41:42.050803+02', '15', '[Dimitra Iwannou - Tech Talk: Exploring AI and its Impact] liked by Dimitra Iwannou', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (498, '2023-12-27 15:42:17.060876+02', '3', '[Christos Borakis - "Upcoming Seminar on Financial Planning] comments Alexis Papadakis "Great insight! Looking forward to more discussions on this topic."', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (499, '2023-12-27 15:42:21.929986+02', '4', '[Alexander Patel - Team Building Day at the Beach!] comments Dimitra Iwannou ""I completely agree with your point. Well said!""', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (500, '2023-12-27 15:42:26.86411+02', '5', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] comments Emily Rodriguez ""This post resonates with my experience. Thanks for sharing!""', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (501, '2023-12-27 15:42:32.567408+02', '6', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] comments Sofia Chang ""Could you elaborate more on this? I''d love to hear your thoughts.""', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (502, '2023-12-27 15:42:42.408707+02', '7', '[Javier Fernandez - Healthy Living Workshop: Mindfulness and Stress Management] comments Sofia Chang "Kudos to the team for organizing such an amazing event!"', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (503, '2023-12-27 15:42:48.056271+02', '8', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] comments Emily Rodriguez "I''m intrigued by this idea. Let''s explore it further."', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (504, '2023-12-27 15:42:54.394025+02', '9', '[Alexis Papadakis - Merry XMAS] comments Emily Rodriguez "I''m intrigued by this idea. Let''s explore it further."', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (505, '2023-12-27 15:42:59.158017+02', '10', '[Sofia Chang - Volunteer Opportunity: Community Cleanup Drive] comments Petros Petrakis "I appreciate your perspective on this matter."', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (506, '2023-12-27 15:43:05.738653+02', '11', '[Javier Fernandez - Healthy Living Workshop: Mindfulness and Stress Management] comments Emily Rodriguez ""I have a similar viewpoint. It''s interesting to see different opinions"', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (507, '2023-12-27 15:43:12.429177+02', '12', '[Christos Borakis - "Upcoming Seminar on Financial Planning] comments Emily Rodriguez "I''m inspired by this initiative. Count me in for support!"', 1, '[{"added": {}}]', 24, 1);
INSERT INTO public.django_admin_log VALUES (508, '2023-12-27 15:45:07.758494+02', '4', '[TechVerse Solutions|Cloud Migration Initiative] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (509, '2023-12-27 15:45:19.995563+02', '5', '[TechVerse Solutions|Cybersecurity Overhaul] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (510, '2023-12-27 15:45:31.580594+02', '6', '[Tech Solutions Inc.|Enterprise Resource Planning (ERP) Integration] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (511, '2023-12-27 15:45:47.266288+02', '7', '[Tech Solutions Inc.|AI-Powered Automation Implementation] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (512, '2023-12-27 15:45:59.071979+02', '8', '[Tech Solutions Inc.|Data Analytics Platform Development] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (513, '2023-12-27 15:46:13.591932+02', '9', '[BioHealth Pharmaceuticals|Mobile App Enhancement] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (514, '2023-12-27 15:46:28.304908+02', '10', '[Telemarketing|Network Infrastructure Optimization] ', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (515, '2023-12-27 15:47:58.241259+02', '4', 'Infrastructure Assessment', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (516, '2023-12-27 15:48:04.960481+02', '5', 'Strategy Formulation', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (517, '2023-12-27 15:48:12.969219+02', '6', 'Resource Allocation', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (518, '2023-12-27 15:48:20.367905+02', '7', 'Data Migration', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (519, '2023-12-27 15:48:28.231697+02', '8', 'System Testing', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (520, '2023-12-27 15:48:37.006301+02', '9', 'Training & Adoption', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (521, '2023-12-27 15:48:45.907329+02', '10', 'Performance Optimization', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (522, '2023-12-27 15:48:53.853342+02', '11', 'Security Enhancement', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (523, '2023-12-27 15:48:59.842567+02', '12', 'Continuous Monitoring', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (524, '2023-12-27 15:49:17.4075+02', '13', 'User Experience Upgrade', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (525, '2023-12-27 15:49:23.864767+02', '14', 'Payment Gateway Integration', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (526, '2023-12-27 15:49:29.379454+02', '15', 'Mobile App Development', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (527, '2023-12-27 15:49:36.240122+02', '16', 'Database Optimization', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (528, '2023-12-27 15:49:44.073879+02', '17', 'Server Upgradation', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (529, '2023-12-27 15:49:50.02819+02', '18', 'API Integration', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (530, '2023-12-27 15:49:59.324896+02', '19', 'SEO Enhancement', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (531, '2023-12-27 15:50:05.78793+02', '20', 'Data Analytics Implementation', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (532, '2023-12-27 15:50:11.963336+02', '21', 'Marketing Campaign Launch', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (533, '2023-12-27 15:50:27.619823+02', '22', 'Infrastructure Assessment', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (534, '2023-12-27 15:50:48.394331+02', '2', 'Task Creation and Assignment', 2, '[{"changed": {"fields": ["Project"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (535, '2023-12-27 16:00:44.864936+02', '7', 'Alexis Papadakis -> [Telemarketing|Start up project of Telemarketing] Strategy Formulation', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (536, '2023-12-27 16:01:05.644235+02', '8', 'Petros Petrakis -> [Eurobank|Online Learning Platform] Infrastructure Assessment', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (537, '2023-12-27 16:01:29.105767+02', '9', 'Dimitra Iwannou -> [TechVerse Solutions|Cloud Migration Initiative] Server Upgradation', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (538, '2023-12-27 16:02:30.36646+02', '10', 'Emily Rodriguez -> [Tech Solutions Inc.|Enterprise Resource Planning (ERP) Integration] Data Analytics Implementation', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (539, '2023-12-27 16:02:57.963072+02', '11', 'Sofia Chang -> [BioHealth Pharmaceuticals|Mobile App Enhancement] Infrastructure Assessment', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (540, '2023-12-28 15:06:11.774558+02', '12', 'Petros Petrakis -> [Eurobank|Online Learning Platform] User Experience Upgrade', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (541, '2023-12-28 15:06:45.568966+02', '13', 'George Papadakis -> [Telemarketing|Start up project of Telemarketing] Payment Gateway Integration', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (542, '2023-12-28 15:07:28.332126+02', '14', 'George Papadakis -> [Telemarketing|Network Infrastructure Optimization] Resource Allocation', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (543, '2023-12-28 15:07:34.646497+02', '15', 'Alexis Papadakis -> [Telemarketing|Network Infrastructure Optimization] Task Creation and Assignment', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (544, '2023-12-28 15:08:17.796858+02', '15', 'peter123@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (545, '2023-12-28 15:09:41.158149+02', '15', 'Peter Willson', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (546, '2023-12-28 15:09:55.078721+02', '41', '[A] Peter Willson -> TechVerse Solutions', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (547, '2023-12-28 15:10:22.166592+02', '16', 'Dimitra Iwannou -> [TechVerse Solutions|Cloud Migration Initiative] System Testing', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (548, '2023-12-28 15:10:26.784091+02', '17', 'Peter Willson -> [TechVerse Solutions|Cybersecurity Overhaul] Data Migration', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (549, '2023-12-28 15:10:30.864359+02', '18', 'Dimitra Iwannou -> [TechVerse Solutions|Cybersecurity Overhaul] Database Optimization', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (550, '2023-12-28 15:10:34.250522+02', '19', 'Dimitra Iwannou -> [TechVerse Solutions|Cybersecurity Overhaul] Mobile App Development', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (551, '2023-12-28 15:10:58.93961+02', '20', 'Emily Rodriguez -> [Tech Solutions Inc.|Enterprise Resource Planning (ERP) Integration] Performance Optimization', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (552, '2023-12-28 15:11:10.753387+02', '21', 'Emily Rodriguez -> [Tech Solutions Inc.|Enterprise Resource Planning (ERP) Integration] Security Enhancement', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (553, '2023-12-28 15:11:16.122522+02', '22', 'Emily Rodriguez -> [Tech Solutions Inc.|AI-Powered Automation Implementation] Continuous Monitoring', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (554, '2023-12-28 15:11:22.185199+02', '23', 'Emily Rodriguez -> [Tech Solutions Inc.|AI-Powered Automation Implementation] Marketing Campaign Launch', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (555, '2023-12-28 15:11:30.074282+02', '24', 'Emily Rodriguez -> [Tech Solutions Inc.|Data Analytics Platform Development] API Integration', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (556, '2023-12-28 15:11:35.267883+02', '25', 'Emily Rodriguez -> [Tech Solutions Inc.|Data Analytics Platform Development] SEO Enhancement', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (557, '2023-12-28 15:11:39.424512+02', '26', 'Emily Rodriguez -> [Tech Solutions Inc.|Data Analytics Platform Development] Training & Adoption', 1, '[{"added": {}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (558, '2023-12-28 15:20:38.582029+02', '22', '2023-12-28 13:20:38.579029+00:00[Dimitra Iwannou->Christos Borakis] φ', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (559, '2023-12-28 15:24:50.552046+02', '22', '2023-12-28 13:24:50.549045+00:00[Dimitra Iwannou->Christos Borakis] φ', 2, '[]', 27, 1);
INSERT INTO public.django_admin_log VALUES (560, '2023-12-28 15:24:55.400126+02', '22', '2023-12-28 13:24:50.549045+00:00[Dimitra Iwannou->Christos Borakis] φ', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (561, '2023-12-28 15:25:04.869882+02', '23', '2023-12-28 13:25:04.868881+00:00[Dimitra Iwannou->Alexis Papadakis] k', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (562, '2023-12-28 15:25:53.948419+02', '24', '2023-12-28 13:25:53.947419+00:00[Dimitra Iwannou->Alexis Papadakis] g', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (563, '2023-12-28 15:26:16.74298+02', '25', '2023-12-28 13:26:16.740979+00:00[Dimitra Iwannou->Alexis Papadakis] jklj', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (564, '2023-12-28 15:26:44.265186+02', '26', '2023-12-28 13:26:44.262185+00:00[Dimitra Iwannou->Alexis Papadakis] j', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (565, '2023-12-28 15:27:05.851319+02', '27', '2023-12-28 13:27:05.849319+00:00[Dimitra Iwannou->Alexis Papadakis] s', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (566, '2023-12-28 15:28:46.327506+02', '28', '2023-12-28 13:28:46.324507+00:00[Dimitra Iwannou->Alexis Papadakis] ds', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (567, '2023-12-28 15:29:13.263266+02', '29', '2023-12-28 13:29:13.262265+00:00[Christos Borakis->Dimitra Iwannou] ;', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (568, '2023-12-28 15:29:37.464979+02', '25', '2023-12-28 13:26:16.740979+00:00[Dimitra Iwannou->Alexis Papadakis] jklj', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (569, '2023-12-28 15:29:37.46798+02', '28', '2023-12-28 13:28:46.324507+00:00[Dimitra Iwannou->Alexis Papadakis] ds', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (570, '2023-12-28 15:29:37.46898+02', '27', '2023-12-28 13:27:05.849319+00:00[Dimitra Iwannou->Alexis Papadakis] s', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (571, '2023-12-28 15:29:37.46898+02', '26', '2023-12-28 13:26:44.262185+00:00[Dimitra Iwannou->Alexis Papadakis] j', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (572, '2023-12-28 15:29:37.469981+02', '24', '2023-12-28 13:25:53.947419+00:00[Dimitra Iwannou->Alexis Papadakis] g', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (573, '2023-12-28 15:29:37.469981+02', '23', '2023-12-28 13:25:04.868881+00:00[Dimitra Iwannou->Alexis Papadakis] k', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (574, '2023-12-28 15:29:37.470981+02', '29', '2023-12-28 13:29:13.262265+00:00[Christos Borakis->Dimitra Iwannou] ;', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (575, '2023-12-28 15:30:09.483983+02', '30', '2023-12-28 13:30:09.482984+00:00[Dimitra Iwannou->Alexis Papadakis] Hi', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (576, '2023-12-28 15:44:38.813985+02', '145', 'None[Dimitra Iwannou->Aisha Khan] Not sure yet, maybe just relaxing.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (577, '2023-12-28 15:44:38.816345+02', '158', 'None[Dimitra Iwannou->Javier Fernandez] How was your vacation?', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (578, '2023-12-28 15:44:38.817266+02', '143', 'None[Alexis Papadakis->Aisha Khan] Im doing well, thanks!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (579, '2023-12-28 15:44:38.817832+02', '147', 'None[Alexis Papadakis->Javier Fernandez] Yes, it was fantastic!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (580, '2023-12-28 15:44:38.817832+02', '162', 'None[Dimitra Iwannou->Alexis Papadakis] Working on the new feature.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (581, '2023-12-28 15:44:38.818834+02', '165', 'None[Dimitra Iwannou->Aisha Khan] Sure, let''s set up a meeting.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (582, '2023-12-28 15:44:38.819835+02', '163', 'None[Alexis Papadakis->Dimitra Iwannou] Exciting, can''t wait to see it!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (583, '2023-12-28 15:44:38.819835+02', '153', 'None[Alexis Papadakis->Alexander Patel] That sounds great, count me in!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (584, '2023-12-28 15:44:38.820834+02', '154', 'None[Alexis Papadakis->Javier Fernandez] We should plan a team dinner.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (585, '2023-12-28 15:44:38.820834+02', '149', 'None[Alexis Papadakis->Javier Fernandez] Absolutely, I''m available next week.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (586, '2023-12-28 15:44:38.821835+02', '144', 'None[Aisha Khan->Dimitra Iwannou] Any plans for the weekend?', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (587, '2023-12-28 15:44:38.821835+02', '142', 'None[Aisha Khan->Alexis Papadakis] Hey, how are you?', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (588, '2023-12-28 15:44:38.822835+02', '161', 'None[Aisha Khan->Aisha Khan] I''ll make sure to attend.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (589, '2023-12-28 15:44:38.822835+02', '157', 'None[Aisha Khan->Dimitra Iwannou] Almost done, just a few more tasks.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (590, '2023-12-28 15:44:38.822835+02', '159', 'None[Javier Fernandez->Dimitra Iwannou] It was amazing, thanks for asking!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (591, '2023-12-28 15:44:38.823835+02', '152', 'None[Alexander Patel->Alexis Papadakis] Thinking of organizing a gathering.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (592, '2023-12-28 15:44:38.823835+02', '164', 'None[Aisha Khan->Dimitra Iwannou] Let''s discuss the strategy.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (593, '2023-12-28 15:44:38.824835+02', '160', 'None[Aisha Khan->Aisha Khan] Meeting at 3 PM tomorrow.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (594, '2023-12-28 15:44:38.824835+02', '146', 'None[Javier Fernandez->Alexis Papadakis] Have you seen the latest movie?', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (595, '2023-12-28 15:44:38.825836+02', '155', 'None[Javier Fernandez->Alexis Papadakis] Agreed, it''s been a while!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (596, '2023-12-28 15:44:38.825836+02', '148', 'None[Javier Fernandez->Alexis Papadakis] Let''s catch up soon.', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (597, '2023-12-28 15:44:38.826836+02', '151', 'None[Javier Fernandez->Dimitra Iwannou] Work''s been busy but productive!', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (598, '2023-12-28 15:44:38.827836+02', '156', 'None[Dimitra Iwannou->Aisha Khan] Did you finish the project?', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (599, '2023-12-28 15:44:38.827836+02', '150', 'None[Dimitra Iwannou->Javier Fernandez] How''s work going?', 3, '', 27, 1);
INSERT INTO public.django_admin_log VALUES (600, '2023-12-28 15:45:13.065514+02', '166', '2023-12-28 13:45:13.064515+00:00[Alexis Papadakis->Dimitra Iwannou] hey', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (601, '2023-12-28 15:47:27.615982+02', '167', '2023-12-28 13:47:27.614981+00:00[Dimitra Iwannou->Alexis Papadakis] Nice to meet you', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (602, '2023-12-28 15:48:53.297054+02', '168', '2023-12-28 13:48:53.297054+00:00[Dimitra Iwannou->Christos Borakis] Hi there!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (603, '2023-12-28 15:49:02.884706+02', '169', '2023-12-28 13:49:02.883705+00:00[Christos Borakis->Dimitra Iwannou] Hey, how are you?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (604, '2023-12-28 15:49:12.249457+02', '170', '2023-12-28 13:49:12.248456+00:00[Dimitra Iwannou->Christos Borakis] I''m good, thanks! Busy day ahead?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (605, '2023-12-28 15:49:22.209833+02', '171', '2023-12-28 13:49:22.208833+00:00[Christos Borakis->Dimitra Iwannou] Yeah, lots to do. Catch you later!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (606, '2023-12-28 15:49:29.249311+02', '172', '2023-12-28 13:49:29.248311+00:00[Javier Fernandez->Alexis Papadakis] Morning', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (607, '2023-12-28 15:49:37.890908+02', '173', '2023-12-28 13:49:37.889907+00:00[Alexis Papadakis->Javier Fernandez] Good morning! Plans for today?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (608, '2023-12-28 15:51:14.746261+02', '174', '2023-12-28 13:51:14.745261+00:00[Javier Fernandez->Alexis Papadakis] They announced a new product launch soon!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (609, '2023-12-28 15:51:24.664249+02', '175', '2023-12-28 13:51:24.663249+00:00[Javier Fernandez->Petros Petrakis] Morning! Any updates on the meeting agenda?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (610, '2023-12-28 15:51:31.760447+02', '176', '2023-12-28 13:51:31.759447+00:00[Petros Petrakis->Javier Fernandez] Yes, they added a discussion on the upcoming project.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (611, '2023-12-28 15:51:40.140519+02', '177', '2023-12-28 13:51:40.139518+00:00[Javier Fernandez->Petros Petrakis] Great, hoping for some insightful discussions.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (612, '2023-12-28 15:51:46.112534+02', '178', '2023-12-28 13:51:46.111534+00:00[Petros Petrakis->Javier Fernandez] Likewise, let''s prepare!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (613, '2023-12-28 15:51:55.087728+02', '179', '2023-12-28 13:51:55.086728+00:00[Aisha Khan->Javier Fernandez] Hey, did you hear about the recent company event?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (614, '2023-12-28 15:52:03.312745+02', '180', '2023-12-28 13:52:03.311744+00:00[Javier Fernandez->Aisha Khan] Yes, I heard it was a huge success!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (615, '2023-12-28 15:52:20.229951+02', '181', '2023-12-28 13:52:20.227949+00:00[Aisha Khan->Javier Fernandez] Indeed! The team did an amazing job organizing it.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (616, '2023-12-28 15:52:28.272301+02', '182', '2023-12-28 13:52:28.271301+00:00[Javier Fernandez->Aisha Khan] Absolutely, they outdid themselves!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (617, '2023-12-28 15:52:40.013248+02', '183', '2023-12-28 13:52:40.012248+00:00[Alexander Patel->Petros Petrakis] Hello! Any updates from the management?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (618, '2023-12-28 15:52:50.821571+02', '184', '2023-12-28 13:52:50.820569+00:00[Petros Petrakis->Alexander Patel] They mentioned expansion plans in the quarterly report.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (619, '2023-12-28 15:52:57.287371+02', '185', '2023-12-28 13:52:57.286371+00:00[Alexander Patel->Petros Petrakis] Interesting, any insights shared on that?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (620, '2023-12-28 15:53:05.431498+02', '186', '2023-12-28 13:53:05.430498+00:00[Petros Petrakis->Alexander Patel] They hinted at exploring new markets.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (621, '2023-12-28 15:53:37.647127+02', '187', '2023-12-28 13:53:37.646127+00:00[Petros Petrakis->Aisha Khan] Hi there! Thoughts on the recent company email?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (622, '2023-12-28 15:53:47.902355+02', '188', '2023-12-28 13:53:47.901356+00:00[Aisha Khan->Petros Petrakis] It highlighted our achievements this year.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (623, '2023-12-28 15:53:56.628821+02', '189', '2023-12-28 13:53:56.627821+00:00[Petros Petrakis->Aisha Khan] Impressive stats, it''s been a productive year.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (624, '2023-12-28 15:54:05.12882+02', '190', '2023-12-28 13:54:05.127820+00:00[Aisha Khan->Petros Petrakis] Absolutely, looking forward to what''s ahead!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (625, '2023-12-28 15:54:19.788395+02', '191', '2023-12-28 13:54:19.787395+00:00[Javier Fernandez->Dimitra Iwannou] Hey! Have you seen the new company policies?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (626, '2023-12-28 15:54:33.391152+02', '192', '2023-12-28 13:54:33.390151+00:00[Dimitra Iwannou->Javier Fernandez] Not yet, any major changes?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (627, '2023-12-28 15:54:47.297085+02', '193', '2023-12-28 13:54:47.296085+00:00[Javier Fernandez->Dimitra Iwannou] They updated the remote work guidelines.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (628, '2023-12-28 15:54:55.545764+02', '194', '2023-12-28 13:54:55.544764+00:00[Dimitra Iwannou->Javier Fernandez] Good to know, flexibility is key!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (629, '2023-12-28 15:55:05.44636+02', '195', '2023-12-28 13:55:05.445359+00:00[Christos Borakis->Emily Rodriguez] Hello! Any insights from the recent board meeting?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (630, '2023-12-28 15:55:17.108831+02', '196', '2023-12-28 13:55:17.107831+00:00[Emily Rodriguez->Christos Borakis] They discussed our Q4 targets and strategies.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (631, '2023-12-28 15:55:24.938464+02', '197', '2023-12-28 13:55:24.937464+00:00[Christos Borakis->Emily Rodriguez] That''s crucial, aiming high for year-end goals.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (632, '2023-12-28 15:55:31.029349+02', '198', '2023-12-28 13:55:31.028349+00:00[Emily Rodriguez->Christos Borakis] Absolutely, let''s align our efforts!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (633, '2023-12-28 15:55:41.390274+02', '199', '2023-12-28 13:55:41.389274+00:00[Sofia Chang->Dimitra Iwannou] Morning! Thoughts on the company''s sustainability efforts?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (634, '2023-12-28 15:55:49.242152+02', '200', '2023-12-28 13:55:49.241151+00:00[Dimitra Iwannou->Sofia Chang] Impressive, they''re focusing more on eco-friendly initiatives.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (635, '2023-12-28 15:55:56.702008+02', '201', '2023-12-28 13:55:56.701008+00:00[Dimitra Iwannou->Sofia Chang] It''s great to see the commitment to sustainability.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (636, '2023-12-28 15:56:03.64522+02', '202', '2023-12-28 13:56:03.644220+00:00[Sofia Chang->Dimitra Iwannou] Indeed, a step in the right direction!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (637, '2023-12-28 15:56:17.808646+02', '203', '2023-12-28 13:56:17.807647+00:00[George Papadakis->Petros Petrakis] Hi! Any insights from the company town hall?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (638, '2023-12-28 15:56:25.72136+02', '204', '2023-12-28 13:56:25.720360+00:00[Petros Petrakis->George Papadakis] They emphasized innovation as our core value.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (639, '2023-12-28 15:56:34.977484+02', '205', '2023-12-28 13:56:34.976484+00:00[George Papadakis->Petros Petrakis] Innovation drives progress, an important focus.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (640, '2023-12-28 15:56:41.925654+02', '206', '2023-12-28 13:56:41.924654+00:00[Sofia Chang->George Papadakis] Hey there! Heard about the company''s charity initiative?', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (641, '2023-12-28 15:56:48.596738+02', '207', '2023-12-28 13:56:48.595737+00:00[George Papadakis->Sofia Chang] Yes, they''re partnering with local NGOs for a cause.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (642, '2023-12-28 15:56:57.942676+02', '208', '2023-12-28 13:56:57.941676+00:00[Sofia Chang->George Papadakis] That''s commendable, proud of our company''s social responsibility.', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (643, '2023-12-28 15:57:05.553886+02', '209', '2023-12-28 13:57:05.552886+00:00[George Papadakis->Sofia Chang] Absolutely, it''s inspiring!', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (644, '2023-12-28 16:25:55.548405+02', '7', '[TechVerse Solutions | Sustainable IT Project Developmen] -> Dimitra Iwannou', 1, '[{"added": {}}]', 38, 1);
INSERT INTO public.django_admin_log VALUES (645, '2023-12-28 16:25:59.584607+02', '8', '[TechVerse Solutions | Sustainable IT Project Developmen] -> Peter Willson', 1, '[{"added": {}}]', 38, 1);
INSERT INTO public.django_admin_log VALUES (646, '2023-12-28 16:29:31.966597+02', '10', '2023-12-28 14:29:31.957596+00:00 [Eurobank | First eurobank group] -> Christos Borakis-> We''re aiming for a phased approach, aiming for 3 months.', 1, '[{"added": {}}]', 39, 1);
INSERT INTO public.django_admin_log VALUES (647, '2023-12-28 16:29:39.422526+02', '11', '2023-12-28 14:29:39.414524+00:00 [Eurobank | First eurobank group] -> Petros Petrakis-> We should allocate tasks and responsibilities accordingly.', 1, '[{"added": {}}]', 39, 1);
INSERT INTO public.django_admin_log VALUES (648, '2023-12-28 16:29:47.838809+02', '12', '2023-12-28 14:29:47.829807+00:00 [Eurobank | First eurobank group] -> Christos Borakis-> Agreed! Let''s create a task breakdown in the next meeting.', 1, '[{"added": {}}]', 39, 1);
INSERT INTO public.django_admin_log VALUES (649, '2023-12-28 16:31:59.63784+02', '16', 'EmilyJohnson@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (650, '2023-12-28 16:33:20.90899+02', '16', 'Emily Johnson', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (651, '2023-12-28 16:33:34.01702+02', '17', 'DanielGarcia@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (652, '2023-12-28 16:34:20.410629+02', '17', 'Daniel Garcia', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (653, '2023-12-28 16:36:29.401536+02', '18', 'SofiaAndersson@yahoo.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (654, '2023-12-28 16:36:55.628033+02', '18', 'Sofia Andersson', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (655, '2023-12-28 16:37:07.707918+02', '19', 'LiamPatel@gmail.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (656, '2023-12-28 16:37:26.227431+02', '19', 'Liam Patel', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (657, '2023-12-28 16:37:37.222498+02', '20', 'ChloeKim@yahoo.com', 1, '[{"added": {}}]', 3, 1);
INSERT INTO public.django_admin_log VALUES (658, '2023-12-28 16:37:54.860019+02', '20', 'Chloe Kim', 1, '[{"added": {}}]', 4, 1);
INSERT INTO public.django_admin_log VALUES (659, '2023-12-28 16:38:08.890381+02', '42', '[A] Emily Johnson -> Olympus Software Solutions SA', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (660, '2023-12-28 16:38:13.678065+02', '43', '[A] Daniel Garcia -> Tech Solutions Inc.', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (661, '2023-12-28 16:38:19.361318+02', '44', '[A] Sofia Andersson -> TechVerse Solutions', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (662, '2023-12-28 16:38:23.458181+02', '45', '[A] Liam Patel -> Olympus Software Solutions SA', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (663, '2023-12-28 16:38:27.422426+02', '46', '[A] Chloe Kim -> Eurobank', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log VALUES (664, '2023-12-28 16:39:33.059076+02', '1', 'Eurodata', 2, '[{"changed": {"fields": ["Company name", "Description"]}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (665, '2023-12-28 16:40:22.372992+02', '2', 'Tele Inc.', 2, '[{"changed": {"fields": ["Company name", "Description"]}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (666, '2023-12-28 16:41:27.618077+02', '25', 'Daniel Garcia -> [Tech Solutions Inc.|Data Analytics Platform Development] SEO Enhancement', 2, '[{"changed": {"fields": ["Assign"]}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (667, '2023-12-28 16:41:38.78814+02', '26', 'Daniel Garcia -> [Tech Solutions Inc.|Data Analytics Platform Development] Training & Adoption', 2, '[{"changed": {"fields": ["Assign"]}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (668, '2023-12-28 16:41:44.352045+02', '10', 'Daniel Garcia -> [Tech Solutions Inc.|Enterprise Resource Planning (ERP) Integration] Data Analytics Implementation', 2, '[{"changed": {"fields": ["Assign"]}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (669, '2023-12-28 16:41:53.642862+02', '19', 'Sofia Andersson -> [TechVerse Solutions|Cybersecurity Overhaul] Mobile App Development', 2, '[{"changed": {"fields": ["Assign"]}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (670, '2023-12-28 16:42:11.088224+02', '12', 'Chloe Kim -> [Eurodata|Online Learning Platform] User Experience Upgrade', 2, '[{"changed": {"fields": ["Assign"]}}]', 33, 1);
INSERT INTO public.django_admin_log VALUES (671, '2023-12-28 16:42:57.965116+02', '9', '[Eurodata | First eurobank group] -> Chloe Kim', 1, '[{"added": {}}]', 38, 1);
INSERT INTO public.django_admin_log VALUES (672, '2023-12-28 16:47:51.891141+02', '10', '[Eurodata | Big Data Analytics] -> Chloe Kim', 1, '[{"added": {}}]', 38, 1);
INSERT INTO public.django_admin_log VALUES (673, '2023-12-28 16:48:54.467032+02', '13', '2023-12-28 14:48:54.458030+00:00 [TechVerse Solutions | Sustainable IT Project Developmen] -> Dimitra Iwannou-> Team, let''s brainstorm ideas for the upcoming project kick-off.', 1, '[{"added": {}}]', 39, 1);
INSERT INTO public.django_admin_log VALUES (674, '2023-12-28 16:49:02.67841+02', '14', '2023-12-28 14:49:02.670408+00:00 [TechVerse Solutions | Sustainable IT Project Developmen] -> Peter Willson-> Agreed, we should leverage our previous successes for this', 1, '[{"added": {}}]', 39, 1);
INSERT INTO public.django_admin_log VALUES (675, '2023-12-28 16:53:09.528986+02', '5', '[Eurodata | Big Data Analytics] admins by Chloe Kim', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (676, '2023-12-28 16:53:15.831634+02', '6', '[Tele Inc. | New Project] admins by Alexis Papadakis', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (677, '2023-12-28 16:53:21.276771+02', '7', '[Tele Inc. | Challenges of Remote Project Management] admins by George Papadakis', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (678, '2023-12-28 16:53:28.575803+02', '8', '[TechVerse Solutions | Sustainable IT Project Developmen] admins by Sofia Andersson', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (679, '2023-12-28 16:53:42.151578+02', '9', '[Eurodata | First eurobank group] admins by Chloe Kim', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (680, '2023-12-28 16:53:44.994609+02', '10', '[Eurodata | First eurobank group] admins by Petros Petrakis', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (681, '2023-12-28 16:53:53.907093+02', '1', '[Eurodata | First eurobank group] admins by Christos Borakis', 3, '', 37, 1);
INSERT INTO public.django_admin_log VALUES (682, '2023-12-28 16:54:04.90636+02', '11', '[Eurodata | Big Data Analytics] admins by Chloe Kim', 1, '[{"added": {}}]', 37, 1);
INSERT INTO public.django_admin_log VALUES (683, '2023-12-28 16:54:13.107903+02', '5', '[Eurodata | Big Data Analytics] admins by Chloe Kim', 3, '', 37, 1);


--
-- TOC entry 3716 (class 0 OID 20268)
-- Dependencies: 219
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations VALUES (1, 'contenttypes', '0001_initial', '2023-11-08 17:31:54.342731+02');
INSERT INTO public.django_migrations VALUES (2, 'auth', '0001_initial', '2023-11-08 17:31:54.412747+02');
INSERT INTO public.django_migrations VALUES (3, 'admin', '0001_initial', '2023-11-08 17:31:54.439753+02');
INSERT INTO public.django_migrations VALUES (4, 'admin', '0002_logentry_remove_auto_add', '2023-11-08 17:31:54.448756+02');
INSERT INTO public.django_migrations VALUES (5, 'admin', '0003_logentry_add_action_flag_choices', '2023-11-08 17:31:54.456758+02');
INSERT INTO public.django_migrations VALUES (6, 'contenttypes', '0002_remove_content_type_name', '2023-11-08 17:31:54.470761+02');
INSERT INTO public.django_migrations VALUES (7, 'auth', '0002_alter_permission_name_max_length', '2023-11-08 17:31:54.477762+02');
INSERT INTO public.django_migrations VALUES (8, 'auth', '0003_alter_user_email_max_length', '2023-11-08 17:31:54.484763+02');
INSERT INTO public.django_migrations VALUES (9, 'auth', '0004_alter_user_username_opts', '2023-11-08 17:31:54.490766+02');
INSERT INTO public.django_migrations VALUES (10, 'auth', '0005_alter_user_last_login_null', '2023-11-08 17:31:54.498767+02');
INSERT INTO public.django_migrations VALUES (11, 'auth', '0006_require_contenttypes_0002', '2023-11-08 17:31:54.500767+02');
INSERT INTO public.django_migrations VALUES (12, 'auth', '0007_alter_validators_add_error_messages', '2023-11-08 17:31:54.506768+02');
INSERT INTO public.django_migrations VALUES (13, 'auth', '0008_alter_user_username_max_length', '2023-11-08 17:31:54.51878+02');
INSERT INTO public.django_migrations VALUES (14, 'auth', '0009_alter_user_last_name_max_length', '2023-11-08 17:31:54.524784+02');
INSERT INTO public.django_migrations VALUES (15, 'auth', '0010_alter_group_name_max_length', '2023-11-08 17:31:54.531785+02');
INSERT INTO public.django_migrations VALUES (16, 'auth', '0011_update_proxy_permissions', '2023-11-08 17:31:54.537786+02');
INSERT INTO public.django_migrations VALUES (17, 'auth', '0012_alter_user_first_name_max_length', '2023-11-08 17:31:54.543787+02');
INSERT INTO public.django_migrations VALUES (18, 'users', '0001_initial', '2023-11-08 17:31:54.589798+02');
INSERT INTO public.django_migrations VALUES (19, 'companies', '0001_initial', '2023-11-08 17:31:54.620424+02');
INSERT INTO public.django_migrations VALUES (20, 'companies', '0002_initial', '2023-11-08 17:31:54.668434+02');
INSERT INTO public.django_migrations VALUES (21, 'sessions', '0001_initial', '2023-11-08 17:31:54.679437+02');
INSERT INTO public.django_migrations VALUES (22, 'companies', '0003_alter_companies_slug', '2023-11-09 14:19:33.123049+02');
INSERT INTO public.django_migrations VALUES (23, 'users', '0002_alter_users_gender_alter_users_slug', '2023-11-09 14:19:33.138053+02');
INSERT INTO public.django_migrations VALUES (24, 'users', '0003_remove_users_phones_users_phone', '2023-11-09 14:48:35.709453+02');
INSERT INTO public.django_migrations VALUES (25, 'companies', '0004_remove_companies_phones_companies_phone', '2023-11-10 15:29:28.054992+02');
INSERT INTO public.django_migrations VALUES (26, 'posts', '0001_initial', '2023-12-06 11:59:27.016337+02');
INSERT INTO public.django_migrations VALUES (27, 'chats', '0001_initial', '2023-12-16 14:41:16.493978+02');
INSERT INTO public.django_migrations VALUES (28, 'chats', '0002_alter_privatechat_date', '2023-12-19 14:03:12.234369+02');
INSERT INTO public.django_migrations VALUES (29, 'groupchats', '0001_initial', '2023-12-19 14:03:12.304384+02');
INSERT INTO public.django_migrations VALUES (30, 'groupchats', '0002_alter_groupchats_name', '2023-12-20 12:38:25.412931+02');
INSERT INTO public.django_migrations VALUES (31, 'projects', '0001_initial', '2023-12-20 12:45:37.172365+02');
INSERT INTO public.django_migrations VALUES (32, 'projects', '0002_alter_projectdivision_file_projectassign', '2023-12-20 13:51:31.831489+02');
INSERT INTO public.django_migrations VALUES (33, 'groupchats', '0003_alter_groupchatmembers_id_alter_groupchatsadmins_id_and_more', '2023-12-26 17:15:29.702733+02');
INSERT INTO public.django_migrations VALUES (34, 'groupchats', '0004_groupchatconversation_send_date', '2023-12-26 17:16:23.906098+02');
INSERT INTO public.django_migrations VALUES (35, 'groupchats', '0005_alter_groupchatconversation_send_date_and_more', '2023-12-26 17:46:39.951517+02');
INSERT INTO public.django_migrations VALUES (36, 'chats', '0003_remove_privatechat_date_privatechat_send_date', '2023-12-26 17:52:53.025129+02');
INSERT INTO public.django_migrations VALUES (37, 'groupchats', '0006_rename_groupchatsadmins_groupadmins_and_more', '2023-12-27 12:55:21.153392+02');
INSERT INTO public.django_migrations VALUES (38, 'chats', '0004_alter_privatechat_send_date', '2023-12-28 15:34:50.351734+02');


--
-- TOC entry 3742 (class 0 OID 20529)
-- Dependencies: 245
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session VALUES ('thjnk1qxshtlsxf30nbjoc68czggjvm4', '.eJxVjDkOwjAUBe_iGlk28ZJQ0ucM1t-MA8iR4qRC3B0ipYD2zcx7qQTbWtLWZEkTq4uy6vS7IdBD6g74DvU2a5rrukyod0UftOlxZnleD_fvoEAr3xpDtgIogw2ZIHY9WBNYBkZvSDg776KcI0YJBM4GjB466n1kA1aY1PsDFHM5HA:1r0kYT:nzXw4oSaj3gcNPDbJPG5EMHlONGyowSn_4GQsqiJhVc', '2023-11-22 17:33:21.590385+02');
INSERT INTO public.django_session VALUES ('wb74w6rxdn6g46mfylpfjp46wf6ia438', '.eJxVjDkOwjAUBe_iGlk28ZJQ0ucM1t-MA8iR4qRC3B0ipYD2zcx7qQTbWtLWZEkTq4uy6vS7IdBD6g74DvU2a5rrukyod0UftOlxZnleD_fvoEAr3xpDtgIogw2ZIHY9WBNYBkZvSDg776KcI0YJBM4GjB466n1kA1aY1PsDFHM5HA:1rASRS:TBjCey359BnM_khhG2eXsq7nTByp0tnD0Eh03lxwXd8', '2023-12-19 12:14:14.456714+02');
INSERT INTO public.django_session VALUES ('5pxbe4xiwhc904t9vpiw1nyi3pz35u67', '.eJxVjDkOwjAUBe_iGlk28ZJQ0ucM1t-MA8iR4qRC3B0ipYD2zcx7qQTbWtLWZEkTq4uy6vS7IdBD6g74DvU2a5rrukyod0UftOlxZnleD_fvoEAr3xpDtgIogw2ZIHY9WBNYBkZvSDg776KcI0YJBM4GjB466n1kA1aY1PsDFHM5HA:1rFXk1:jgevkzjNl45rC-111zPAYM8NYstuEwXISE3sNaQxwDo', '2024-01-02 12:54:25.373819+02');
INSERT INTO public.django_session VALUES ('n2648fir49lf4kjysyi3e4op6rhtxb54', '.eJxVjDkOwjAUBe_iGlk28ZJQ0ucM1t-MA8iR4qRC3B0ipYD2zcx7qQTbWtLWZEkTq4uy6vS7IdBD6g74DvU2a5rrukyod0UftOlxZnleD_fvoEAr3xpDtgIogw2ZIHY9WBNYBkZvSDg776KcI0YJBM4GjB466n1kA1aY1PsDFHM5HA:1rIRBs:QMMnDia5oWfBaBWZ8fJvj_AObkTndNr8616HyBZGc6M', '2024-01-10 12:31:08.799949+02');


--
-- TOC entry 3734 (class 0 OID 20405)
-- Dependencies: 237
-- Data for Name: users_credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_credentials VALUES (3, 'aa@gmail.com', 'pbkdf2_sha256$600000$TJ63EvnSFx72skjAZE5MmV$DYSZ8fREdZ4rQJ6eTlkxVsy4lzjca7EO2jij3RLNcy4=');
INSERT INTO public.users_credentials VALUES (2, 'second@mail.gr', 'pbkdf2_sha256$600000$aOMEzlkuPRinKEv9Xmsu0Q$E19/yLwuYL7b6UBybXTF2dD7giEO4P5f3KPHqal0P+A=');
INSERT INTO public.users_credentials VALUES (1, 'first@email.com', 'pbkdf2_sha256$600000$qtKOFJvcz1Eo8g1ienIf1T$8XFnqLWScQbJhFK2++TXicAdwfps4LLYc5odliiJHS4=');
INSERT INTO public.users_credentials VALUES (7, 'petros@gmail.com', 'pbkdf2_sha256$600000$CoC8a6goODTZcvXcw2r0QB$14YwsiTQxfWDc3N4kJzxPsrM+mdOXUe/fFK6vH0pNdU=');
INSERT INTO public.users_credentials VALUES (9, 'dimitra@gmail.com', 'pbkdf2_sha256$600000$sFnyDDcr7rzZ1EgofIHP3Z$bUZSvPqrxi4NbE5vTln8DJ6lMeizxdWh4kkN1T4eFaM=');
INSERT INTO public.users_credentials VALUES (10, 'RodriguezEmily@gmail.com', 'pbkdf2_sha256$600000$gmNTlNe4HTbYIIEXS6Ir73$6ELsV80nmoP+sqZ90KpGUsfilvQIVzhFAFvruoqOG0A=');
INSERT INTO public.users_credentials VALUES (11, 'AlexanderPatel@yahoo.com', 'pbkdf2_sha256$600000$9h0BG00XcWtLhSNLXXjfJr$gz87BKYyNe328QEVh8+A5VOXnqzoBJoTjCAuzJ1kSqM=');
INSERT INTO public.users_credentials VALUES (12, 'SofiaChang@gmail.com', 'pbkdf2_sha256$600000$DiXmFN3hiSXB145w2TpHSI$2N2G+BfUg0EgvqsAiHf9cQU6mMgf3OTwxtbix3FYn7I=');
INSERT INTO public.users_credentials VALUES (13, 'JavierFernandez@gmail.com', 'pbkdf2_sha256$600000$p61rr5FHWURCxmPnwHURGV$LqQz8pq5Ylp+Np+Mh5XRM7IfjAHpfV1f5pg6hLZ9/U0=');
INSERT INTO public.users_credentials VALUES (14, 'AishaKhan@gmail.com', 'pbkdf2_sha256$600000$baZeMheMqtPeNlOLeNB19i$ZcYwC/QhpHovswlz7u8amCqxhJqo2PnvugsZFyL6C/U=');
INSERT INTO public.users_credentials VALUES (15, 'peter123@gmail.com', 'pbkdf2_sha256$600000$fKrqLnFysOk96shvYjzemo$lOYTToaD0+D5+3hBrZG6xHe1pMNH46BYghTfe8UD7ek=');
INSERT INTO public.users_credentials VALUES (16, 'EmilyJohnson@gmail.com', 'pbkdf2_sha256$600000$Rt3IHOokWJVIQpL0RI1acH$sNeHNeFXvRW7lg/HiR4UWcFa+LnlI0MVQf6nmeu7oII=');
INSERT INTO public.users_credentials VALUES (17, 'DanielGarcia@gmail.com', 'pbkdf2_sha256$600000$rKSse04m1bRNiByoDV8nf5$1LfWzyd+OMlPBdKqrsbJJsW8YKTmZNfACm0D+unkTk8=');
INSERT INTO public.users_credentials VALUES (18, 'SofiaAndersson@yahoo.com', 'pbkdf2_sha256$600000$7LfAF7bcunpTHV1MtEQEV6$HdX2Q3Ew/TmvyRJkUxxoAcDAZVC4O8e8e8UtvRITovU=');
INSERT INTO public.users_credentials VALUES (19, 'LiamPatel@gmail.com', 'pbkdf2_sha256$600000$v0lYbJUJZO5H53puQzhrke$Cl0TjiazBBjCsogFfVOScGhdHjmO3e3XNlFxB4jKgLo=');
INSERT INTO public.users_credentials VALUES (20, 'ChloeKim@yahoo.com', 'pbkdf2_sha256$600000$BHVOJdc9s23fdjd8pYXFTm$OFhFH+R2HavnxLIWx41NG6ouHXUS4zZtCNxa8Q70CM4=');


--
-- TOC entry 3735 (class 0 OID 20414)
-- Dependencies: 238
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (3, 'George', NULL, 'Papadakis', 'george-papadakis', 'Software Engineer', 'M', '', '', 'Greece', '2023-11-09 14:14:11.560375+02', '+306942885327');
INSERT INTO public.users VALUES (1, 'Christos', NULL, 'Borakis', 'christos-borakis', 'Software Engineer', 'M', 'user_image/IMG_20210917_093952_UUOMnem.jpg', 'Im a software engineer student', 'Greece', '2023-11-08 17:39:42.454918+02', '+306948215695');
INSERT INTO public.users VALUES (2, 'Alexis', NULL, 'Papadakis', 'alexis-papadakis', 'Network Engineer', 'M', '', '', 'United Kingdom', '2023-11-08 17:40:53.521909+02', '+306945269530');
INSERT INTO public.users VALUES (7, 'Petros', NULL, 'Petrakis', 'petros-petrakis', 'Developer', 'M', '', 'dsfsagfasfsa', 'Greece', '2023-12-12 12:08:54.392518+02', '+306915487523');
INSERT INTO public.users VALUES (9, 'Dimitra', NULL, 'Iwannou', 'dimitra-iwannou', 'Developer', 'F', '', '', 'Greece', '2023-12-26 16:05:20.287028+02', '+306984576230');
INSERT INTO public.users VALUES (10, 'Emily', NULL, 'Rodriguez', 'emily-rodriguez', 'Software Engineer', 'F', '', 'Emily is passionate about coding and creating innovative software solutions. She enjoys hiking and photography in her free time.', 'United States', '2023-12-27 15:10:16.294147+02', '+12125552368');
INSERT INTO public.users VALUES (11, 'Alexander', NULL, 'Patel', 'alexander-patel', 'Doctor', 'M', '', 'Alexander is a dedicated physician working in a local hospital. He loves playing the piano and volunteers at a charity for underprivileged children.', 'United Kingdom', '2023-12-27 15:10:51.49033+02', '+442012345678');
INSERT INTO public.users VALUES (12, 'Sofia', NULL, 'Chang', 'sofia-chang', 'Graphic Designer', 'F', '', 'Sofia is an artistic soul passionate about visual storytelling. She enjoys traveling to explore diverse cultures and find inspiration for her designs.', 'China', '2023-12-27 15:11:24.252735+02', '+861087654321');
INSERT INTO public.users VALUES (13, 'Javier', NULL, 'Fernandez', 'javier-fernandez', 'Marketing Manager', 'M', '', 'Javier is a creative marketing professional with a knack for digital campaigns. He loves playing soccer and volunteers at a local animal shelter.', 'Spain', '2023-12-27 15:11:53.526368+02', '+34915554321');
INSERT INTO public.users VALUES (14, 'Aisha', NULL, 'Khan', 'aisha-khan', 'Teacher', 'F', '', 'Aisha is an enthusiastic educator devoted to shaping young minds. She enjoys reading classic literature and participating in community outreach programs.', 'Pakistan', '2023-12-27 15:12:38.799471+02', '+925198765432');
INSERT INTO public.users VALUES (15, 'Peter', NULL, 'Willson', 'peter-willson', 'Software Engineer', 'M', '', 'Highly motivated professional with a proven track record in project management and a knack for fostering collaborative work environments to drive team success.', 'Greece', '2023-12-28 15:09:41.148147+02', '+306948532150');
INSERT INTO public.users VALUES (16, 'Emily', NULL, 'Johnson', 'emily-johnson', 'Software Engineer', 'F', '', 'Passionate about coding, loves hiking, and exploring new technologies.', 'United States', '2023-12-28 16:33:20.900988+02', '+15624852001');
INSERT INTO public.users VALUES (17, 'Daniel', NULL, 'Garcia', 'daniel-garcia', 'Marketing Manager', 'M', '', 'Enthusiastic about creative campaigns, enjoys photography and traveling.', 'Canada', '2023-12-28 16:34:20.404627+02', '+14155559876');
INSERT INTO public.users VALUES (18, 'Sofia', NULL, 'Andersson', 'sofia-andersson', 'Financial Analyst', 'F', '', 'Detail-oriented, passionate about finance, loves playing tennis.', 'Sweden', '2023-12-28 16:36:55.61703+02', '+46701234567');
INSERT INTO public.users VALUES (19, 'Liam', NULL, 'Patel', 'liam-patel', 'Graphic Designer', 'M', '', 'Creative and artistic, enjoys sketching, and exploring new design trends.', 'United Kingdom', '2023-12-28 16:37:26.22043+02', '+442087654321');
INSERT INTO public.users VALUES (20, 'Chloe', NULL, 'Kim', 'chloe-kim', 'Data Scientist', 'F', '', 'Analytical thinker, passionate about data analysis, enjoys playing the piano.', 'South Korea', '2023-12-28 16:37:54.850016+02', '+821012345678');


--
-- TOC entry 3739 (class 0 OID 20432)
-- Dependencies: 242
-- Data for Name: education_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.education_details VALUES (1, '5th High School of Chania', '2022-02-08', 1);
INSERT INTO public.education_details VALUES (2, '16 Γενικό Λύκειο Αττικής', '2011-06-20', 2);


--
-- TOC entry 3760 (class 0 OID 29159)
-- Dependencies: 263
-- Data for Name: friend_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.friend_requests VALUES (2, 3, 1, 'A');
INSERT INTO public.friend_requests VALUES (3, 7, 2, 'A');
INSERT INTO public.friend_requests VALUES (4, 2, 1, 'A');
INSERT INTO public.friend_requests VALUES (5, 9, 2, 'A');
INSERT INTO public.friend_requests VALUES (6, 9, 1, 'A');
INSERT INTO public.friend_requests VALUES (7, 13, 2, 'A');
INSERT INTO public.friend_requests VALUES (8, 13, 7, 'A');
INSERT INTO public.friend_requests VALUES (9, 14, 13, 'A');
INSERT INTO public.friend_requests VALUES (10, 11, 7, 'A');
INSERT INTO public.friend_requests VALUES (11, 7, 14, 'A');
INSERT INTO public.friend_requests VALUES (12, 13, 9, 'A');
INSERT INTO public.friend_requests VALUES (14, 1, 10, 'A');
INSERT INTO public.friend_requests VALUES (15, 12, 9, 'A');
INSERT INTO public.friend_requests VALUES (16, 3, 7, 'A');
INSERT INTO public.friend_requests VALUES (13, 12, 3, 'A');


--
-- TOC entry 3762 (class 0 OID 29167)
-- Dependencies: 265
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.friends VALUES (19, 9, 2);
INSERT INTO public.friends VALUES (20, 2, 9);
INSERT INTO public.friends VALUES (21, 9, 1);
INSERT INTO public.friends VALUES (22, 1, 9);
INSERT INTO public.friends VALUES (23, 13, 2);
INSERT INTO public.friends VALUES (24, 2, 13);
INSERT INTO public.friends VALUES (25, 13, 7);
INSERT INTO public.friends VALUES (26, 7, 13);
INSERT INTO public.friends VALUES (27, 14, 13);
INSERT INTO public.friends VALUES (28, 13, 14);
INSERT INTO public.friends VALUES (29, 11, 7);
INSERT INTO public.friends VALUES (30, 7, 11);
INSERT INTO public.friends VALUES (31, 7, 14);
INSERT INTO public.friends VALUES (32, 14, 7);
INSERT INTO public.friends VALUES (33, 13, 9);
INSERT INTO public.friends VALUES (34, 9, 13);
INSERT INTO public.friends VALUES (35, 1, 10);
INSERT INTO public.friends VALUES (36, 10, 1);
INSERT INTO public.friends VALUES (37, 12, 9);
INSERT INTO public.friends VALUES (38, 9, 12);
INSERT INTO public.friends VALUES (39, 3, 7);
INSERT INTO public.friends VALUES (40, 7, 3);
INSERT INTO public.friends VALUES (41, 12, 3);
INSERT INTO public.friends VALUES (42, 3, 12);


--
-- TOC entry 3766 (class 0 OID 29231)
-- Dependencies: 269
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.groups VALUES (1, 'First eurobank group', 1);
INSERT INTO public.groups VALUES (2, 'New Project', 2);
INSERT INTO public.groups VALUES (3, 'Challenges of Remote Project Management', 2);
INSERT INTO public.groups VALUES (4, 'Sustainable IT Project Developmen', 4);
INSERT INTO public.groups VALUES (5, 'Big Data Analytics', 1);


--
-- TOC entry 3744 (class 0 OID 20569)
-- Dependencies: 247
-- Data for Name: work_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.work_requests VALUES (26, 3, 2, 'A');
INSERT INTO public.work_requests VALUES (33, 2, 2, 'A');
INSERT INTO public.work_requests VALUES (34, 7, 1, 'A');
INSERT INTO public.work_requests VALUES (36, 9, 4, 'A');
INSERT INTO public.work_requests VALUES (37, 10, 5, 'A');
INSERT INTO public.work_requests VALUES (38, 11, 5, 'P');
INSERT INTO public.work_requests VALUES (39, 12, 6, 'A');
INSERT INTO public.work_requests VALUES (40, 14, 6, 'A');
INSERT INTO public.work_requests VALUES (41, 15, 4, 'A');
INSERT INTO public.work_requests VALUES (42, 16, 7, 'A');
INSERT INTO public.work_requests VALUES (43, 17, 5, 'A');
INSERT INTO public.work_requests VALUES (44, 18, 4, 'A');
INSERT INTO public.work_requests VALUES (45, 19, 7, 'A');
INSERT INTO public.work_requests VALUES (46, 20, 1, 'A');
INSERT INTO public.work_requests VALUES (23, 1, 1, 'A');


--
-- TOC entry 3748 (class 0 OID 20656)
-- Dependencies: 251
-- Data for Name: works_on; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.works_on VALUES (36, 26, false);
INSERT INTO public.works_on VALUES (45, 34, false);
INSERT INTO public.works_on VALUES (25, 23, true);
INSERT INTO public.works_on VALUES (49, 39, false);
INSERT INTO public.works_on VALUES (50, 40, true);
INSERT INTO public.works_on VALUES (44, 33, true);
INSERT INTO public.works_on VALUES (48, 37, true);
INSERT INTO public.works_on VALUES (47, 36, true);
INSERT INTO public.works_on VALUES (51, 41, false);
INSERT INTO public.works_on VALUES (52, 42, false);
INSERT INTO public.works_on VALUES (53, 43, false);
INSERT INTO public.works_on VALUES (54, 44, false);
INSERT INTO public.works_on VALUES (55, 45, false);
INSERT INTO public.works_on VALUES (56, 46, false);


--
-- TOC entry 3768 (class 0 OID 29239)
-- Dependencies: 271
-- Data for Name: group_admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.group_admins VALUES (6, 44, 2);
INSERT INTO public.group_admins VALUES (7, 36, 3);
INSERT INTO public.group_admins VALUES (8, 54, 4);
INSERT INTO public.group_admins VALUES (9, 56, 1);
INSERT INTO public.group_admins VALUES (10, 45, 1);
INSERT INTO public.group_admins VALUES (11, 56, 5);


--
-- TOC entry 3770 (class 0 OID 29245)
-- Dependencies: 273
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.group_members VALUES (1, 1, 25);
INSERT INTO public.group_members VALUES (3, 1, 45);
INSERT INTO public.group_members VALUES (4, 2, 36);
INSERT INTO public.group_members VALUES (6, 2, 44);
INSERT INTO public.group_members VALUES (7, 4, 47);
INSERT INTO public.group_members VALUES (8, 4, 51);
INSERT INTO public.group_members VALUES (9, 1, 56);
INSERT INTO public.group_members VALUES (10, 5, 56);
INSERT INTO public.group_members VALUES (11, 3, 36);
INSERT INTO public.group_members VALUES (12, 4, 54);


--
-- TOC entry 3780 (class 0 OID 37531)
-- Dependencies: 283
-- Data for Name: group_chat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.group_chat VALUES (5, 'hi', '', 1, 1, '2023-12-26 17:51:31.624286+02');
INSERT INTO public.group_chat VALUES (6, 'Hello team!!!', '', 1, 3, '2023-12-26 17:57:23.761409+02');
INSERT INTO public.group_chat VALUES (7, 'Im so anxious about the new project...', '', 2, 4, '2023-12-26 17:57:39.261229+02');
INSERT INTO public.group_chat VALUES (8, 'Yes me too', '', 2, 6, '2023-12-26 17:57:47.051064+02');
INSERT INTO public.group_chat VALUES (9, 'it sounds difficult', '', 2, 4, '2023-12-26 17:58:01.159791+02');
INSERT INTO public.group_chat VALUES (10, 'We''re aiming for a phased approach, aiming for 3 months.', '', 1, 1, '2023-12-28 16:29:31.957596+02');
INSERT INTO public.group_chat VALUES (11, 'We should allocate tasks and responsibilities accordingly.', '', 1, 3, '2023-12-28 16:29:39.414524+02');
INSERT INTO public.group_chat VALUES (12, 'Agreed! Let''s create a task breakdown in the next meeting.', '', 1, 1, '2023-12-28 16:29:47.829807+02');
INSERT INTO public.group_chat VALUES (13, 'Team, let''s brainstorm ideas for the upcoming project kick-off.', '', 4, 7, '2023-12-28 16:48:54.45803+02');
INSERT INTO public.group_chat VALUES (14, 'Agreed, we should leverage our previous successes for this', '', 4, 8, '2023-12-28 16:49:02.670408+02');


--
-- TOC entry 3714 (class 0 OID 20259)
-- Dependencies: 217
-- Data for Name: phone; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.phone VALUES (1, '30', '6942885327');
INSERT INTO public.phone VALUES (2, '44', '5648512354');
INSERT INTO public.phone VALUES (3, '30', '2105445845');
INSERT INTO public.phone VALUES (4, '30', '6915487526');


--
-- TOC entry 3746 (class 0 OID 20617)
-- Dependencies: 249
-- Data for Name: posts_private; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_private VALUES (21, 'telemarketingfirst-post', 36, 'First Post', 'Good morning', '2023-12-12 12:11:58.756351+02', 'posts/posts_private/Telemarketing/IMG_20210916_124355.jpg');
INSERT INTO public.posts_private VALUES (23, 'techverse-solutionsnew-member', 47, 'New member', 'Thank you very much for accepting the job
I will try my best for the company', '2023-12-26 16:35:47.041744+02', '');
INSERT INTO public.posts_private VALUES (24, 'eurobankwelcome-new-hires', 25, 'Welcome New Hires!', 'We''re excited to welcome our new team members aboard! Say hello and share your best tips for getting started.', '2023-12-27 15:31:06.285384+02', '');
INSERT INTO public.posts_private VALUES (25, 'telemarketingcompany-event-reminder-town-hall-meeting', 36, 'Company Event Reminder: Town Hall Meeting', 'Don''t forget to join us at the town hall meeting tomorrow in the main conference room. We''ll be discussing upcoming projects and addressing any questions you might have.', '2023-12-27 15:31:18.306184+02', '');
INSERT INTO public.posts_private VALUES (26, 'eurobankvolunteer-opportunity-community-cleanup-day', 45, 'Volunteer Opportunity: Community Cleanup Day', 'Join us this Saturday for a community cleanup day! We''re looking for volunteers to help make our neighborhood cleaner and greener. Sign up here!', '2023-12-27 15:31:26.302006+02', '');
INSERT INTO public.posts_private VALUES (27, 'biohealth-pharmaceuticalsemployee-spotlight-meet-employee-name', 50, 'Employee Spotlight: Meet [Employee Name]', 'Let''s congratulate [Employee Name] for their outstanding contribution to our recent project. Get to know them better and learn about their journey at our company.', '2023-12-27 15:31:40.153684+02', '');
INSERT INTO public.posts_private VALUES (28, 'techverse-solutionstech-tips-tuesday-cybersecurity-best-practices', 47, 'Tech Tips Tuesday: Cybersecurity Best Practices', 'In light of recent security concerns, here are some essential cybersecurity tips to keep our data and systems secure. Share your own recommendations in the comments!', '2023-12-27 15:31:48.31264+02', '');
INSERT INTO public.posts_private VALUES (29, 'telemarketingcompany-wellness-program-yoga-sessions', 44, 'Company Wellness Program: Yoga Sessions', 'Company Wellness Program: Yoga Sessions', '2023-12-27 15:31:55.533596+02', '');
INSERT INTO public.posts_private VALUES (30, 'biohealth-pharmaceuticalscall-for-ideas-office-redesign-project', 49, 'Call for Ideas: Office Redesign Project', 'We''re revamping our office space and want your input! Share your ideas, suggestions, and preferences for the new office layout.', '2023-12-27 15:32:05.68891+02', '');
INSERT INTO public.posts_private VALUES (31, 'tech-solutions-incprofessional-development-opportunities', 48, 'Professional Development Opportunities', 'Explore new professional development courses available this quarter. Enhance your skills and grow your career with our learning resources.', '2023-12-27 15:32:14.168841+02', '');
INSERT INTO public.posts_private VALUES (32, 'eurobankcongratulations-employee-name-on-work-anniversary', 25, 'Congratulations [Employee Name] on Work Anniversary!', 'Let''s celebrate [Employee Name]''s [X years] at our company! Share your congratulations and memorable experiences working together."

Title: "Upcoming Holiday Schedule Reminder', '2023-12-27 15:32:22.624342+02', '');
INSERT INTO public.posts_private VALUES (33, 'biohealth-pharmaceuticalsupcoming-holiday-schedule-reminder', 49, 'Upcoming Holiday Schedule Reminder', 'As the holiday season approaches, here''s a reminder of our company''s holiday schedule and office hours. Plan ahead and enjoy the festivities!"', '2023-12-27 15:32:40.088657+02', '');


--
-- TOC entry 3756 (class 0 OID 20779)
-- Dependencies: 259
-- Data for Name: posts_private_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_private_comments VALUES (1, 21, 44, 'Great', '2023-12-12 13:14:13.083728+02');
INSERT INTO public.posts_private_comments VALUES (2, 23, 47, '!!!', '2023-12-26 16:36:47.170266+02');
INSERT INTO public.posts_private_comments VALUES (3, 21, 44, 'Great initiative! Looking forward to seeing the positive impact.', '2023-12-27 15:34:28.269745+02');
INSERT INTO public.posts_private_comments VALUES (4, 21, 44, 'Thanks for organizing! I''ll be there to lend a hand.', '2023-12-27 15:34:39.335724+02');
INSERT INTO public.posts_private_comments VALUES (5, 24, 45, 'Congratulations! Well deserved!', '2023-12-27 15:34:47.409758+02');
INSERT INTO public.posts_private_comments VALUES (6, 25, 44, 'What an inspiring story! Thanks for sharing.', '2023-12-27 15:34:57.526247+02');
INSERT INTO public.posts_private_comments VALUES (7, 26, 25, 'Fantastic work! Keep it up!', '2023-12-27 15:35:06.359946+02');
INSERT INTO public.posts_private_comments VALUES (8, 26, 25, 'I''m interested! How can I sign up?', '2023-12-27 15:35:15.994141+02');
INSERT INTO public.posts_private_comments VALUES (9, 28, 47, 'Impressive achievement! Kudos to the team', '2023-12-27 15:35:28.283092+02');
INSERT INTO public.posts_private_comments VALUES (10, 33, 49, '"This is awesome news! Can''t wait to attend."', '2023-12-27 15:36:17.801336+02');
INSERT INTO public.posts_private_comments VALUES (11, 32, 45, 'Wishing everyone a productive meeting!', '2023-12-27 15:36:28.132851+02');
INSERT INTO public.posts_private_comments VALUES (12, 33, 50, 'Count me in! Excited for the event.', '2023-12-27 15:36:39.727566+02');


--
-- TOC entry 3750 (class 0 OID 20699)
-- Dependencies: 253
-- Data for Name: posts_private_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_private_likes VALUES (6, 23, 47);
INSERT INTO public.posts_private_likes VALUES (7, 21, 44);
INSERT INTO public.posts_private_likes VALUES (8, 25, 36);
INSERT INTO public.posts_private_likes VALUES (9, 21, 36);
INSERT INTO public.posts_private_likes VALUES (10, 24, 25);
INSERT INTO public.posts_private_likes VALUES (11, 25, 44);
INSERT INTO public.posts_private_likes VALUES (12, 26, 25);
INSERT INTO public.posts_private_likes VALUES (13, 26, 45);
INSERT INTO public.posts_private_likes VALUES (14, 27, 50);
INSERT INTO public.posts_private_likes VALUES (15, 27, 49);
INSERT INTO public.posts_private_likes VALUES (16, 28, 47);
INSERT INTO public.posts_private_likes VALUES (17, 29, 36);
INSERT INTO public.posts_private_likes VALUES (18, 30, 50);
INSERT INTO public.posts_private_likes VALUES (19, 31, 48);
INSERT INTO public.posts_private_likes VALUES (20, 32, 45);
INSERT INTO public.posts_private_likes VALUES (21, 32, 25);
INSERT INTO public.posts_private_likes VALUES (22, 33, 50);


--
-- TOC entry 3752 (class 0 OID 20744)
-- Dependencies: 255
-- Data for Name: posts_public; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_public VALUES (1, 'christos-borakisfirst-public-post', 1, 'First public post', 'hello good morning to evryone', '2023-12-12 12:46:53.362164+02', 'posts/posts_public/ChristosBorakis/3Legs.jpg');
INSERT INTO public.posts_public VALUES (2, 'alexis-papadakismerry-xmas', 2, 'Merry XMAS', 'Good monring  to everyone enjoy ur holidas', '2023-12-20 13:32:49.390616+02', 'posts/posts_public/AlexisPapadakis/Full.jpg');
INSERT INTO public.posts_public VALUES (3, 'christos-borakisupcoming-seminar-on-financial-planning', 1, '"Upcoming Seminar on Financial Planning', 'Join us for an insightful seminar next week on smart financial planning strategies for young professionals. Don''t miss this opportunity to gain valuable knowledge from industry experts!', '2023-12-27 15:39:58.889019+02', '');
INSERT INTO public.posts_public VALUES (4, 'dimitra-iwannoutech-talk-exploring-ai-and-its-impact', 9, 'Tech Talk: Exploring AI and its Impact', 'Our next Tech Talk series dives deep into Artificial Intelligence and its transformative influence across industries. Engage in discussions about its potential and ethical considerations.', '2023-12-27 15:40:06.218689+02', '');
INSERT INTO public.posts_public VALUES (5, 'alexander-patelteam-building-day-at-the-beach', 11, 'Team Building Day at the Beach!', 'Get ready for a day filled with fun team-building activities by the beach! Join us for games, barbeque, and great company. Let''s strengthen our bonds outside the office!', '2023-12-27 15:40:15.668569+02', '');
INSERT INTO public.posts_public VALUES (6, 'sofia-changvolunteer-opportunity-community-cleanup-drive', 12, 'Volunteer Opportunity: Community Cleanup Drive', 'Make a positive impact in our community by volunteering for a cleanup drive this Saturday. Together, let''s work towards a cleaner and healthier environment!', '2023-12-27 15:40:26.915911+02', '');
INSERT INTO public.posts_public VALUES (7, 'javier-fernandezhealthy-living-workshop-mindfulness-and-stress-management', 13, 'Healthy Living Workshop: Mindfulness and Stress Management', 'Learn effective techniques to manage stress and promote mindfulness in our upcoming workshop. Invest in your well-being and discover strategies for a healthier lifestyle.', '2023-12-27 15:40:33.796479+02', '');


--
-- TOC entry 3758 (class 0 OID 20787)
-- Dependencies: 261
-- Data for Name: posts_public_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_public_comments VALUES (1, 1, 1, 'great news', '2023-12-12 13:15:43.220941+02');
INSERT INTO public.posts_public_comments VALUES (2, 1, 3, 'cool', '2023-12-12 13:15:53.249211+02');
INSERT INTO public.posts_public_comments VALUES (3, 3, 2, 'Great insight! Looking forward to more discussions on this topic.', '2023-12-27 15:42:17.051874+02');
INSERT INTO public.posts_public_comments VALUES (4, 5, 9, '"I completely agree with your point. Well said!"', '2023-12-27 15:42:21.919985+02');
INSERT INTO public.posts_public_comments VALUES (5, 6, 10, '"This post resonates with my experience. Thanks for sharing!"', '2023-12-27 15:42:26.854107+02');
INSERT INTO public.posts_public_comments VALUES (6, 6, 12, '"Could you elaborate more on this? I''d love to hear your thoughts."', '2023-12-27 15:42:32.558407+02');
INSERT INTO public.posts_public_comments VALUES (7, 7, 12, 'Kudos to the team for organizing such an amazing event!', '2023-12-27 15:42:42.399704+02');
INSERT INTO public.posts_public_comments VALUES (8, 6, 10, 'I''m intrigued by this idea. Let''s explore it further.', '2023-12-27 15:42:48.048267+02');
INSERT INTO public.posts_public_comments VALUES (9, 2, 10, 'I''m intrigued by this idea. Let''s explore it further.', '2023-12-27 15:42:54.386024+02');
INSERT INTO public.posts_public_comments VALUES (10, 6, 7, 'I appreciate your perspective on this matter.', '2023-12-27 15:42:59.149016+02');
INSERT INTO public.posts_public_comments VALUES (11, 7, 10, '"I have a similar viewpoint. It''s interesting to see different opinions', '2023-12-27 15:43:05.730651+02');
INSERT INTO public.posts_public_comments VALUES (12, 3, 10, 'I''m inspired by this initiative. Count me in for support!', '2023-12-27 15:43:12.420174+02');


--
-- TOC entry 3754 (class 0 OID 20761)
-- Dependencies: 257
-- Data for Name: posts_public_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_public_likes VALUES (1, 1, 2);
INSERT INTO public.posts_public_likes VALUES (2, 2, 3);
INSERT INTO public.posts_public_likes VALUES (3, 2, 1);
INSERT INTO public.posts_public_likes VALUES (4, 2, 9);
INSERT INTO public.posts_public_likes VALUES (5, 3, 2);
INSERT INTO public.posts_public_likes VALUES (6, 3, 3);
INSERT INTO public.posts_public_likes VALUES (7, 4, 11);
INSERT INTO public.posts_public_likes VALUES (8, 6, 10);
INSERT INTO public.posts_public_likes VALUES (9, 6, 13);
INSERT INTO public.posts_public_likes VALUES (10, 7, 7);
INSERT INTO public.posts_public_likes VALUES (11, 5, 10);
INSERT INTO public.posts_public_likes VALUES (12, 4, 14);
INSERT INTO public.posts_public_likes VALUES (13, 3, 14);
INSERT INTO public.posts_public_likes VALUES (14, 6, 1);
INSERT INTO public.posts_public_likes VALUES (15, 4, 9);


--
-- TOC entry 3764 (class 0 OID 29203)
-- Dependencies: 267
-- Data for Name: private_chat; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.private_chat VALUES (30, 'Hi', 20, 19, '2023-12-28 15:30:09.482984+02');
INSERT INTO public.private_chat VALUES (166, 'hey', 19, 20, '2023-12-28 15:45:13.064515+02');
INSERT INTO public.private_chat VALUES (167, 'Nice to meet you', 20, 19, '2023-12-28 15:47:27.614981+02');
INSERT INTO public.private_chat VALUES (168, 'Hi there!', 22, 21, '2023-12-28 15:48:53.297054+02');
INSERT INTO public.private_chat VALUES (169, 'Hey, how are you?', 21, 22, '2023-12-28 15:49:02.883705+02');
INSERT INTO public.private_chat VALUES (170, 'I''m good, thanks! Busy day ahead?', 22, 21, '2023-12-28 15:49:12.248456+02');
INSERT INTO public.private_chat VALUES (171, 'Yeah, lots to do. Catch you later!', 21, 22, '2023-12-28 15:49:22.208833+02');
INSERT INTO public.private_chat VALUES (172, 'Morning', 24, 23, '2023-12-28 15:49:29.248311+02');
INSERT INTO public.private_chat VALUES (173, 'Good morning! Plans for today?', 23, 24, '2023-12-28 15:49:37.889907+02');
INSERT INTO public.private_chat VALUES (174, 'They announced a new product launch soon!', 24, 23, '2023-12-28 15:51:14.745261+02');
INSERT INTO public.private_chat VALUES (175, 'Morning! Any updates on the meeting agenda?', 26, 25, '2023-12-28 15:51:24.663249+02');
INSERT INTO public.private_chat VALUES (176, 'Yes, they added a discussion on the upcoming project.', 25, 26, '2023-12-28 15:51:31.759447+02');
INSERT INTO public.private_chat VALUES (177, 'Great, hoping for some insightful discussions.', 26, 25, '2023-12-28 15:51:40.139518+02');
INSERT INTO public.private_chat VALUES (178, 'Likewise, let''s prepare!', 25, 26, '2023-12-28 15:51:46.111534+02');
INSERT INTO public.private_chat VALUES (179, 'Hey, did you hear about the recent company event?', 28, 27, '2023-12-28 15:51:55.086728+02');
INSERT INTO public.private_chat VALUES (180, 'Yes, I heard it was a huge success!', 27, 28, '2023-12-28 15:52:03.311744+02');
INSERT INTO public.private_chat VALUES (181, 'Indeed! The team did an amazing job organizing it.', 28, 27, '2023-12-28 15:52:20.227949+02');
INSERT INTO public.private_chat VALUES (182, 'Absolutely, they outdid themselves!', 27, 28, '2023-12-28 15:52:28.271301+02');
INSERT INTO public.private_chat VALUES (183, 'Hello! Any updates from the management?', 30, 29, '2023-12-28 15:52:40.012248+02');
INSERT INTO public.private_chat VALUES (184, 'They mentioned expansion plans in the quarterly report.', 29, 30, '2023-12-28 15:52:50.820569+02');
INSERT INTO public.private_chat VALUES (185, 'Interesting, any insights shared on that?', 30, 29, '2023-12-28 15:52:57.286371+02');
INSERT INTO public.private_chat VALUES (186, 'They hinted at exploring new markets.', 29, 30, '2023-12-28 15:53:05.430498+02');
INSERT INTO public.private_chat VALUES (187, 'Hi there! Thoughts on the recent company email?', 32, 31, '2023-12-28 15:53:37.646127+02');
INSERT INTO public.private_chat VALUES (188, 'It highlighted our achievements this year.', 31, 32, '2023-12-28 15:53:47.901356+02');
INSERT INTO public.private_chat VALUES (189, 'Impressive stats, it''s been a productive year.', 32, 31, '2023-12-28 15:53:56.627821+02');
INSERT INTO public.private_chat VALUES (190, 'Absolutely, looking forward to what''s ahead!', 31, 32, '2023-12-28 15:54:05.12782+02');
INSERT INTO public.private_chat VALUES (191, 'Hey! Have you seen the new company policies?', 34, 33, '2023-12-28 15:54:19.787395+02');
INSERT INTO public.private_chat VALUES (192, 'Not yet, any major changes?', 33, 34, '2023-12-28 15:54:33.390151+02');
INSERT INTO public.private_chat VALUES (193, 'They updated the remote work guidelines.', 34, 33, '2023-12-28 15:54:47.296085+02');
INSERT INTO public.private_chat VALUES (194, 'Good to know, flexibility is key!', 33, 34, '2023-12-28 15:54:55.544764+02');
INSERT INTO public.private_chat VALUES (195, 'Hello! Any insights from the recent board meeting?', 36, 35, '2023-12-28 15:55:05.445359+02');
INSERT INTO public.private_chat VALUES (196, 'They discussed our Q4 targets and strategies.', 35, 36, '2023-12-28 15:55:17.107831+02');
INSERT INTO public.private_chat VALUES (197, 'That''s crucial, aiming high for year-end goals.', 36, 35, '2023-12-28 15:55:24.937464+02');
INSERT INTO public.private_chat VALUES (198, 'Absolutely, let''s align our efforts!', 35, 36, '2023-12-28 15:55:31.028349+02');
INSERT INTO public.private_chat VALUES (199, 'Morning! Thoughts on the company''s sustainability efforts?', 38, 37, '2023-12-28 15:55:41.389274+02');
INSERT INTO public.private_chat VALUES (200, 'Impressive, they''re focusing more on eco-friendly initiatives.', 37, 38, '2023-12-28 15:55:49.241151+02');
INSERT INTO public.private_chat VALUES (201, 'It''s great to see the commitment to sustainability.', 37, 38, '2023-12-28 15:55:56.701008+02');
INSERT INTO public.private_chat VALUES (202, 'Indeed, a step in the right direction!', 38, 37, '2023-12-28 15:56:03.64422+02');
INSERT INTO public.private_chat VALUES (203, 'Hi! Any insights from the company town hall?', 40, 39, '2023-12-28 15:56:17.807647+02');
INSERT INTO public.private_chat VALUES (204, 'They emphasized innovation as our core value.', 39, 40, '2023-12-28 15:56:25.72036+02');
INSERT INTO public.private_chat VALUES (205, 'Innovation drives progress, an important focus.', 40, 39, '2023-12-28 15:56:34.976484+02');
INSERT INTO public.private_chat VALUES (206, 'Hey there! Heard about the company''s charity initiative?', 42, 41, '2023-12-28 15:56:41.924654+02');
INSERT INTO public.private_chat VALUES (207, 'Yes, they''re partnering with local NGOs for a cause.', 41, 42, '2023-12-28 15:56:48.595737+02');
INSERT INTO public.private_chat VALUES (208, 'That''s commendable, proud of our company''s social responsibility.', 42, 41, '2023-12-28 15:56:57.941676+02');
INSERT INTO public.private_chat VALUES (209, 'Absolutely, it''s inspiring!', 41, 42, '2023-12-28 15:57:05.552886+02');


--
-- TOC entry 3772 (class 0 OID 29289)
-- Dependencies: 275
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projects VALUES (1, 'Start up project of Telemarketing', 'The Task Management System is a web application designed to help teams efficiently manage tasks, deadlines, and collaborations within a company or organization. The system allows users to create, assign, track, and prioritize tasks across different teams or departments.', 'I', '2024-01-01', '2024-07-01', 2);
INSERT INTO public.projects VALUES (2, 'Online Learning Platform', 'Certainly! Here''s an IT project idea:

Project Title: Online Learning Platform

Project Description:
An Online Learning Platform that offers a variety of courses for users to learn new skills, access educational content, and interact with instructors or peers. The platform will provide an intuitive interface for both learners and instructors, allowing users to enroll in courses, track progress, and engage in discussions.', 'I', '2024-03-14', '2024-07-17', 1);
INSERT INTO public.projects VALUES (4, 'Cloud Migration Initiative', 'Migrating company systems to cloud-based infrastructure for enhanced scalability.', 'I', '2024-03-15', '2024-12-30', 4);
INSERT INTO public.projects VALUES (5, 'Cybersecurity Overhaul', 'Implementing advanced security protocols and measures for data protection.', 'I', '2024-01-10', '2024-09-25', 4);
INSERT INTO public.projects VALUES (6, 'Enterprise Resource Planning (ERP) Integration', 'Integrating various ERP systems to streamline organizational processes.', 'I', '2024-05-20', '2025-02-10', 5);
INSERT INTO public.projects VALUES (7, 'AI-Powered Automation Implementation', 'Implementing AI-driven automation solutions for improved operational efficiency.', 'I', '2024-06-08', '2025-03-20', 5);
INSERT INTO public.projects VALUES (8, 'Data Analytics Platform Development', 'Description: Developing a robust data analytics platform for insightful business decisions.', 'I', '2024-04-12', '2025-01-28', 5);
INSERT INTO public.projects VALUES (9, 'Mobile App Enhancement', 'Upgrading and enhancing the existing mobile application for better user experience.', 'I', '2024-02-25', '2024-11-10', 6);
INSERT INTO public.projects VALUES (10, 'Network Infrastructure Optimization', 'Optimizing network infrastructure for improved performance and reliability.', 'I', '2024-07-19', '2025-04-05', 2);


--
-- TOC entry 3778 (class 0 OID 37481)
-- Dependencies: 281
-- Data for Name: project_admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_admins VALUES (2, 2, 45);


--
-- TOC entry 3774 (class 0 OID 29297)
-- Dependencies: 277
-- Data for Name: project_divisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_divisions VALUES (3, 'Instructor Dashboard', 'Tools for instructors to create and manage courses, upload content, and monitor student progress.', 'projects/Eurobank/2/Full.zip', 2);
INSERT INTO public.project_divisions VALUES (1, 'User Authentication', 'Secure user login and registration system for team members.', 'projects/Telemarketing/1/SpotifySetup.exe', 1);
INSERT INTO public.project_divisions VALUES (4, 'Infrastructure Assessment', 'Analyzing the current infrastructure to identify components suitable for cloud migration.', '', 2);
INSERT INTO public.project_divisions VALUES (5, 'Strategy Formulation', 'Developing a comprehensive strategy for a seamless transition to cloud-based systems.', '', 1);
INSERT INTO public.project_divisions VALUES (6, 'Resource Allocation', 'Allocating necessary resources and defining roles for the migration process.', '', 10);
INSERT INTO public.project_divisions VALUES (7, 'Data Migration', 'Migrating critical data and applications to the designated cloud platform.', '', 5);
INSERT INTO public.project_divisions VALUES (8, 'System Testing', 'Conducting rigorous testing to ensure the functionality and reliability of the new cloud system.', '', 4);
INSERT INTO public.project_divisions VALUES (9, 'Training & Adoption', 'Training employees on utilizing the new cloud infrastructure effectively.', '', 8);
INSERT INTO public.project_divisions VALUES (10, 'Performance Optimization', 'Optimizing the cloud setup for enhanced performance and cost-efficiency.', '', 6);
INSERT INTO public.project_divisions VALUES (11, 'Security Enhancement', 'Strengthening security measures to protect data stored in the cloud.', '', 6);
INSERT INTO public.project_divisions VALUES (12, 'Continuous Monitoring', 'Implementing monitoring tools for ongoing assessment and maintenance.', '', 7);
INSERT INTO public.project_divisions VALUES (13, 'User Experience Upgrade', 'Improving UI/UX elements for better navigation and customer engagement.', '', 2);
INSERT INTO public.project_divisions VALUES (14, 'Payment Gateway Integration', 'Integrating additional secure payment gateways to expand customer payment options.', '', 1);
INSERT INTO public.project_divisions VALUES (15, 'Mobile App Development', 'Developing a responsive mobile application for improved accessibility.', '', 5);
INSERT INTO public.project_divisions VALUES (16, 'Database Optimization', 'Optimizing database architecture for faster query response and data handling.', '', 5);
INSERT INTO public.project_divisions VALUES (17, 'Server Upgradation', 'Upgrading server infrastructure to accommodate increased traffic and transactions.', '', 4);
INSERT INTO public.project_divisions VALUES (18, 'API Integration', 'Integrating APIs for third-party services to enhance platform functionality.', '', 8);
INSERT INTO public.project_divisions VALUES (19, 'SEO Enhancement', 'Improving SEO strategies to increase organic traffic and visibility.', '', 8);
INSERT INTO public.project_divisions VALUES (20, 'Data Analytics Implementation', 'Implementing analytics tools for understanding user behavior and preferences.', '', 6);
INSERT INTO public.project_divisions VALUES (21, 'Marketing Campaign Launch', 'Launching targeted marketing campaigns for product promotion.', '', 7);
INSERT INTO public.project_divisions VALUES (22, 'Infrastructure Assessment', 'Analyzing the current infrastructure to identify components suitable for cloud migration.', '', 9);
INSERT INTO public.project_divisions VALUES (2, 'Task Creation and Assignment', 'Users can create tasks, set deadlines, and assign them to specific team members or groups.', 'projects/Telemarketing/1/TP4815_TP5066.zip', 10);


--
-- TOC entry 3776 (class 0 OID 37475)
-- Dependencies: 279
-- Data for Name: project_assign; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_assign VALUES (2, 3, 25);
INSERT INTO public.project_assign VALUES (4, 1, 36);
INSERT INTO public.project_assign VALUES (7, 5, 44);
INSERT INTO public.project_assign VALUES (8, 4, 45);
INSERT INTO public.project_assign VALUES (9, 17, 47);
INSERT INTO public.project_assign VALUES (11, 22, 49);
INSERT INTO public.project_assign VALUES (13, 14, 36);
INSERT INTO public.project_assign VALUES (14, 6, 36);
INSERT INTO public.project_assign VALUES (15, 2, 44);
INSERT INTO public.project_assign VALUES (16, 8, 47);
INSERT INTO public.project_assign VALUES (17, 7, 51);
INSERT INTO public.project_assign VALUES (18, 16, 47);
INSERT INTO public.project_assign VALUES (20, 10, 48);
INSERT INTO public.project_assign VALUES (21, 11, 48);
INSERT INTO public.project_assign VALUES (22, 12, 48);
INSERT INTO public.project_assign VALUES (23, 21, 48);
INSERT INTO public.project_assign VALUES (24, 18, 48);
INSERT INTO public.project_assign VALUES (25, 19, 53);
INSERT INTO public.project_assign VALUES (26, 9, 53);
INSERT INTO public.project_assign VALUES (10, 20, 53);
INSERT INTO public.project_assign VALUES (19, 15, 54);
INSERT INTO public.project_assign VALUES (12, 13, 56);


--
-- TOC entry 3737 (class 0 OID 20426)
-- Dependencies: 240
-- Data for Name: university_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.university_details VALUES (1, 'Technical University Of Crete', '2023-08-07', 'Software Engineer', 1);
INSERT INTO public.university_details VALUES (2, 'Harvard University', '2015-04-11', 'Master of Business Administration', 3);
INSERT INTO public.university_details VALUES (3, 'University of Oxford', '2022-01-14', 'Master of Science (MS) in Computer Science', 2);
INSERT INTO public.university_details VALUES (4, 'Stanford University', '2011-04-12', 'Master of Science (MS) in Computer Science', 7);
INSERT INTO public.university_details VALUES (5, 'ETH Zurich (Swiss Federal Institute of Technology)', '2011-12-27', 'Master of Science (MSc) in Mechanical Engineering', 9);
INSERT INTO public.university_details VALUES (6, 'ETH Zurich (Swiss Federal Institute of Technology)', '2014-07-12', 'Master of Science (MSc) in Mechanical Engineering', 1);
INSERT INTO public.university_details VALUES (7, 'Stanford University', '2020-12-24', 'Master of Business Administration (MBA)', 10);
INSERT INTO public.university_details VALUES (8, 'Harvard University', '2020-12-24', 'Bachelor of Science in Computer Science', 11);
INSERT INTO public.university_details VALUES (9, 'Massachusetts Institute of Technology (MIT)', '2020-05-30', 'Bachelor of Science in Mechanical Engineering', 12);
INSERT INTO public.university_details VALUES (10, 'University of Oxford', '2018-09-28', 'Doctor of Philosophy (Ph.D.) in Economics', 13);
INSERT INTO public.university_details VALUES (11, 'Massachusetts Institute of Technology (MIT)', '2017-11-05', 'Bachelor of Science in Mechanical Engineering', 14);


--
-- TOC entry 3786 (class 0 OID 0)
-- Dependencies: 214
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 7, true);


--
-- TOC entry 3787 (class 0 OID 0)
-- Dependencies: 224
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- TOC entry 3788 (class 0 OID 0)
-- Dependencies: 226
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- TOC entry 3789 (class 0 OID 0)
-- Dependencies: 222
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 172, true);


--
-- TOC entry 3790 (class 0 OID 0)
-- Dependencies: 230
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- TOC entry 3791 (class 0 OID 0)
-- Dependencies: 228
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- TOC entry 3792 (class 0 OID 0)
-- Dependencies: 232
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- TOC entry 3793 (class 0 OID 0)
-- Dependencies: 243
-- Name: companies_company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_company_id_seq', 7, true);


--
-- TOC entry 3794 (class 0 OID 0)
-- Dependencies: 234
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 683, true);


--
-- TOC entry 3795 (class 0 OID 0)
-- Dependencies: 220
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 39, true);


--
-- TOC entry 3796 (class 0 OID 0)
-- Dependencies: 218
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 38, true);


--
-- TOC entry 3797 (class 0 OID 0)
-- Dependencies: 241
-- Name: education_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.education_details_id_seq', 2, true);


--
-- TOC entry 3798 (class 0 OID 0)
-- Dependencies: 262
-- Name: friend_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friend_requests_id_seq', 16, true);


--
-- TOC entry 3799 (class 0 OID 0)
-- Dependencies: 264
-- Name: friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friends_id_seq', 42, true);


--
-- TOC entry 3800 (class 0 OID 0)
-- Dependencies: 282
-- Name: group_chat_conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_chat_conversation_id_seq', 14, true);


--
-- TOC entry 3801 (class 0 OID 0)
-- Dependencies: 270
-- Name: group_chats_admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_chats_admins_id_seq', 11, true);


--
-- TOC entry 3802 (class 0 OID 0)
-- Dependencies: 268
-- Name: group_chats_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_chats_group_id_seq', 5, true);


--
-- TOC entry 3803 (class 0 OID 0)
-- Dependencies: 272
-- Name: group_chats_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_chats_members_id_seq', 12, true);


--
-- TOC entry 3804 (class 0 OID 0)
-- Dependencies: 216
-- Name: phone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phone_id_seq', 4, true);


--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 258
-- Name: posts_private_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_private_comments_id_seq', 12, true);


--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 252
-- Name: posts_private_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_private_likes_id_seq', 22, true);


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 248
-- Name: posts_private_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_private_post_id_seq', 33, true);


--
-- TOC entry 3808 (class 0 OID 0)
-- Dependencies: 260
-- Name: posts_public_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_public_comments_id_seq', 12, true);


--
-- TOC entry 3809 (class 0 OID 0)
-- Dependencies: 256
-- Name: posts_public_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_public_likes_id_seq', 15, true);


--
-- TOC entry 3810 (class 0 OID 0)
-- Dependencies: 254
-- Name: posts_public_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_public_post_id_seq', 7, true);


--
-- TOC entry 3811 (class 0 OID 0)
-- Dependencies: 266
-- Name: private_chat_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.private_chat_message_id_seq', 209, true);


--
-- TOC entry 3812 (class 0 OID 0)
-- Dependencies: 280
-- Name: project_admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_admins_id_seq', 2, true);


--
-- TOC entry 3813 (class 0 OID 0)
-- Dependencies: 278
-- Name: project_assign_participant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_assign_participant_id_seq', 26, true);


--
-- TOC entry 3814 (class 0 OID 0)
-- Dependencies: 276
-- Name: project_divisions_division_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_divisions_division_seq', 22, true);


--
-- TOC entry 3815 (class 0 OID 0)
-- Dependencies: 274
-- Name: projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_project_id_seq', 10, true);


--
-- TOC entry 3816 (class 0 OID 0)
-- Dependencies: 239
-- Name: university_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.university_details_id_seq', 11, true);


--
-- TOC entry 3817 (class 0 OID 0)
-- Dependencies: 236
-- Name: users_credentials_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_credentials_user_id_seq', 20, true);


--
-- TOC entry 3818 (class 0 OID 0)
-- Dependencies: 246
-- Name: work_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.work_requests_id_seq', 46, true);


--
-- TOC entry 3819 (class 0 OID 0)
-- Dependencies: 250
-- Name: works_on_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.works_on_id_seq', 56, true);


-- Completed on 2023-12-28 19:15:24

--
-- PostgreSQL database dump complete
--

