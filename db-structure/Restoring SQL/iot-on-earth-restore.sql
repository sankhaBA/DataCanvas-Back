PGDMP                      {            iot-on-earth    16.1    16.1 y    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16565    iot-on-earth    DATABASE     �   CREATE DATABASE "iot-on-earth" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "iot-on-earth";
                postgres    false                        2615    16644    iot-on-earth-public    SCHEMA     %   CREATE SCHEMA "iot-on-earth-public";
 #   DROP SCHEMA "iot-on-earth-public";
                postgres    false            �            1259    17476    columnconstraints    TABLE       CREATE TABLE "iot-on-earth-public".columnconstraints (
    constraint_id integer NOT NULL,
    constraint_name character varying(10) NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 4   DROP TABLE "iot-on-earth-public".columnconstraints;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17475 #   columnconstraints_constraint_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".columnconstraints_constraint_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE "iot-on-earth-public".columnconstraints_constraint_id_seq;
       iot-on-earth-public          postgres    false    5    226            �           0    0 #   columnconstraints_constraint_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE "iot-on-earth-public".columnconstraints_constraint_id_seq OWNED BY "iot-on-earth-public".columnconstraints.constraint_id;
          iot-on-earth-public          postgres    false    225            �            1259    17467    columndatatypes    TABLE       CREATE TABLE "iot-on-earth-public".columndatatypes (
    type_id integer NOT NULL,
    type_name character varying(10) NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 2   DROP TABLE "iot-on-earth-public".columndatatypes;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17466    columndatatypes_type_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".columndatatypes_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE "iot-on-earth-public".columndatatypes_type_id_seq;
       iot-on-earth-public          postgres    false    5    224            �           0    0    columndatatypes_type_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE "iot-on-earth-public".columndatatypes_type_id_seq OWNED BY "iot-on-earth-public".columndatatypes.type_id;
          iot-on-earth-public          postgres    false    223            �            1259    17485    columns    TABLE     2  CREATE TABLE "iot-on-earth-public".columns (
    clm_id integer NOT NULL,
    clm_name character varying(10) NOT NULL,
    data_type integer,
    tbl_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 *   DROP TABLE "iot-on-earth-public".columns;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17484    columns_clm_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".columns_clm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE "iot-on-earth-public".columns_clm_id_seq;
       iot-on-earth-public          postgres    false    228    5            �           0    0    columns_clm_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE "iot-on-earth-public".columns_clm_id_seq OWNED BY "iot-on-earth-public".columns.clm_id;
          iot-on-earth-public          postgres    false    227            �            1259    17504    constraintsofcolumn    TABLE       CREATE TABLE "iot-on-earth-public".constraintsofcolumn (
    id integer NOT NULL,
    clm_id integer,
    constraint_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 6   DROP TABLE "iot-on-earth-public".constraintsofcolumn;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17503    constraintsofcolumn_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".constraintsofcolumn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE "iot-on-earth-public".constraintsofcolumn_id_seq;
       iot-on-earth-public          postgres    false    230    5            �           0    0    constraintsofcolumn_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE "iot-on-earth-public".constraintsofcolumn_id_seq OWNED BY "iot-on-earth-public".constraintsofcolumn.id;
          iot-on-earth-public          postgres    false    229            �            1259    17453 
   datatables    TABLE     "  CREATE TABLE "iot-on-earth-public".datatables (
    tbl_id integer NOT NULL,
    tbl_name character varying(15) NOT NULL,
    project_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 -   DROP TABLE "iot-on-earth-public".datatables;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17452    datatables_tbl_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".datatables_tbl_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE "iot-on-earth-public".datatables_tbl_id_seq;
       iot-on-earth-public          postgres    false    5    222            �           0    0    datatables_tbl_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE "iot-on-earth-public".datatables_tbl_id_seq OWNED BY "iot-on-earth-public".datatables.tbl_id;
          iot-on-earth-public          postgres    false    221            �            1259    17439    devices    TABLE     S  CREATE TABLE "iot-on-earth-public".devices (
    device_id integer NOT NULL,
    device_name character varying(50) NOT NULL,
    device_description character varying(50),
    project_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 *   DROP TABLE "iot-on-earth-public".devices;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17438    devices_device_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".devices_device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE "iot-on-earth-public".devices_device_id_seq;
       iot-on-earth-public          postgres    false    220    5            �           0    0    devices_device_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE "iot-on-earth-public".devices_device_id_seq OWNED BY "iot-on-earth-public".devices.device_id;
          iot-on-earth-public          postgres    false    219            �            1259    17556    gauges    TABLE     J  CREATE TABLE "iot-on-earth-public".gauges (
    id integer NOT NULL,
    widget_id integer,
    clm_id integer,
    max_value double precision NOT NULL,
    gauge_type integer NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 )   DROP TABLE "iot-on-earth-public".gauges;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17555    gauges_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".gauges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE "iot-on-earth-public".gauges_id_seq;
       iot-on-earth-public          postgres    false    236    5            �           0    0    gauges_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE "iot-on-earth-public".gauges_id_seq OWNED BY "iot-on-earth-public".gauges.id;
          iot-on-earth-public          postgres    false    235            �            1259    17575    parametertables    TABLE     	  CREATE TABLE "iot-on-earth-public".parametertables (
    id integer NOT NULL,
    widget_id integer,
    clm_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 2   DROP TABLE "iot-on-earth-public".parametertables;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17574    parametertables_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".parametertables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE "iot-on-earth-public".parametertables_id_seq;
       iot-on-earth-public          postgres    false    5    238            �           0    0    parametertables_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE "iot-on-earth-public".parametertables_id_seq OWNED BY "iot-on-earth-public".parametertables.id;
          iot-on-earth-public          postgres    false    237            �            1259    17425    projects    TABLE     t  CREATE TABLE "iot-on-earth-public".projects (
    project_id integer NOT NULL,
    project_name character varying(50) NOT NULL,
    description character varying(200),
    fingerprint character varying(40),
    user_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 +   DROP TABLE "iot-on-earth-public".projects;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17424    projects_project_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE "iot-on-earth-public".projects_project_id_seq;
       iot-on-earth-public          postgres    false    5    218            �           0    0    projects_project_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE "iot-on-earth-public".projects_project_id_seq OWNED BY "iot-on-earth-public".projects.project_id;
          iot-on-earth-public          postgres    false    217            �            1259    17537    toggles    TABLE       CREATE TABLE "iot-on-earth-public".toggles (
    id integer NOT NULL,
    widget_id integer,
    clm_id integer,
    write_enabled boolean,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 *   DROP TABLE "iot-on-earth-public".toggles;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17536    toggles_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".toggles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE "iot-on-earth-public".toggles_id_seq;
       iot-on-earth-public          postgres    false    234    5            �           0    0    toggles_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE "iot-on-earth-public".toggles_id_seq OWNED BY "iot-on-earth-public".toggles.id;
          iot-on-earth-public          postgres    false    233            �            1259    17416    users    TABLE     1  CREATE TABLE "iot-on-earth-public".users (
    user_id integer NOT NULL,
    email character varying(50) NOT NULL,
    user_name character varying(50) NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 (   DROP TABLE "iot-on-earth-public".users;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17415    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE "iot-on-earth-public".users_user_id_seq;
       iot-on-earth-public          postgres    false    216    5            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE "iot-on-earth-public".users_user_id_seq OWNED BY "iot-on-earth-public".users.user_id;
          iot-on-earth-public          postgres    false    215            �            1259    17594 
   variations    TABLE     )  CREATE TABLE "iot-on-earth-public".variations (
    id integer NOT NULL,
    widget_id integer,
    x_axis integer,
    variation_type integer NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 -   DROP TABLE "iot-on-earth-public".variations;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17593    variations_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".variations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE "iot-on-earth-public".variations_id_seq;
       iot-on-earth-public          postgres    false    5    240            �           0    0    variations_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE "iot-on-earth-public".variations_id_seq OWNED BY "iot-on-earth-public".variations.id;
          iot-on-earth-public          postgres    false    239            �            1259    17613    variationseries    TABLE       CREATE TABLE "iot-on-earth-public".variationseries (
    id integer NOT NULL,
    variation_id integer,
    clm_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 2   DROP TABLE "iot-on-earth-public".variationseries;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17612    variationseries_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".variationseries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE "iot-on-earth-public".variationseries_id_seq;
       iot-on-earth-public          postgres    false    242    5            �           0    0    variationseries_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE "iot-on-earth-public".variationseries_id_seq OWNED BY "iot-on-earth-public".variationseries.id;
          iot-on-earth-public          postgres    false    241            �            1259    17523    widgets    TABLE     �   CREATE TABLE "iot-on-earth-public".widgets (
    widget_id integer NOT NULL,
    dataset integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 *   DROP TABLE "iot-on-earth-public".widgets;
       iot-on-earth-public         heap    postgres    false    5            �            1259    17522    widgets_widget_id_seq    SEQUENCE     �   CREATE SEQUENCE "iot-on-earth-public".widgets_widget_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE "iot-on-earth-public".widgets_widget_id_seq;
       iot-on-earth-public          postgres    false    5    232            �           0    0    widgets_widget_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE "iot-on-earth-public".widgets_widget_id_seq OWNED BY "iot-on-earth-public".widgets.widget_id;
          iot-on-earth-public          postgres    false    231            �           2604    17479    columnconstraints constraint_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".columnconstraints ALTER COLUMN constraint_id SET DEFAULT nextval('"iot-on-earth-public".columnconstraints_constraint_id_seq'::regclass);
 ]   ALTER TABLE "iot-on-earth-public".columnconstraints ALTER COLUMN constraint_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    225    226    226            �           2604    17470    columndatatypes type_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".columndatatypes ALTER COLUMN type_id SET DEFAULT nextval('"iot-on-earth-public".columndatatypes_type_id_seq'::regclass);
 U   ALTER TABLE "iot-on-earth-public".columndatatypes ALTER COLUMN type_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    223    224    224            �           2604    17488    columns clm_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".columns ALTER COLUMN clm_id SET DEFAULT nextval('"iot-on-earth-public".columns_clm_id_seq'::regclass);
 L   ALTER TABLE "iot-on-earth-public".columns ALTER COLUMN clm_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    228    227    228            �           2604    17507    constraintsofcolumn id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn ALTER COLUMN id SET DEFAULT nextval('"iot-on-earth-public".constraintsofcolumn_id_seq'::regclass);
 T   ALTER TABLE "iot-on-earth-public".constraintsofcolumn ALTER COLUMN id DROP DEFAULT;
       iot-on-earth-public          postgres    false    230    229    230            �           2604    17456    datatables tbl_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".datatables ALTER COLUMN tbl_id SET DEFAULT nextval('"iot-on-earth-public".datatables_tbl_id_seq'::regclass);
 O   ALTER TABLE "iot-on-earth-public".datatables ALTER COLUMN tbl_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    221    222    222            �           2604    17442    devices device_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".devices ALTER COLUMN device_id SET DEFAULT nextval('"iot-on-earth-public".devices_device_id_seq'::regclass);
 O   ALTER TABLE "iot-on-earth-public".devices ALTER COLUMN device_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    220    219    220            �           2604    17559 	   gauges id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".gauges ALTER COLUMN id SET DEFAULT nextval('"iot-on-earth-public".gauges_id_seq'::regclass);
 G   ALTER TABLE "iot-on-earth-public".gauges ALTER COLUMN id DROP DEFAULT;
       iot-on-earth-public          postgres    false    235    236    236            �           2604    17578    parametertables id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".parametertables ALTER COLUMN id SET DEFAULT nextval('"iot-on-earth-public".parametertables_id_seq'::regclass);
 P   ALTER TABLE "iot-on-earth-public".parametertables ALTER COLUMN id DROP DEFAULT;
       iot-on-earth-public          postgres    false    238    237    238            �           2604    17428    projects project_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".projects ALTER COLUMN project_id SET DEFAULT nextval('"iot-on-earth-public".projects_project_id_seq'::regclass);
 Q   ALTER TABLE "iot-on-earth-public".projects ALTER COLUMN project_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    218    217    218            �           2604    17540 
   toggles id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".toggles ALTER COLUMN id SET DEFAULT nextval('"iot-on-earth-public".toggles_id_seq'::regclass);
 H   ALTER TABLE "iot-on-earth-public".toggles ALTER COLUMN id DROP DEFAULT;
       iot-on-earth-public          postgres    false    233    234    234            �           2604    17419    users user_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".users ALTER COLUMN user_id SET DEFAULT nextval('"iot-on-earth-public".users_user_id_seq'::regclass);
 K   ALTER TABLE "iot-on-earth-public".users ALTER COLUMN user_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    216    215    216            �           2604    17597    variations id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".variations ALTER COLUMN id SET DEFAULT nextval('"iot-on-earth-public".variations_id_seq'::regclass);
 K   ALTER TABLE "iot-on-earth-public".variations ALTER COLUMN id DROP DEFAULT;
       iot-on-earth-public          postgres    false    240    239    240            �           2604    17616    variationseries id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".variationseries ALTER COLUMN id SET DEFAULT nextval('"iot-on-earth-public".variationseries_id_seq'::regclass);
 P   ALTER TABLE "iot-on-earth-public".variationseries ALTER COLUMN id DROP DEFAULT;
       iot-on-earth-public          postgres    false    241    242    242            �           2604    17526    widgets widget_id    DEFAULT     �   ALTER TABLE ONLY "iot-on-earth-public".widgets ALTER COLUMN widget_id SET DEFAULT nextval('"iot-on-earth-public".widgets_widget_id_seq'::regclass);
 O   ALTER TABLE "iot-on-earth-public".widgets ALTER COLUMN widget_id DROP DEFAULT;
       iot-on-earth-public          postgres    false    231    232    232            �          0    17476    columnconstraints 
   TABLE DATA           t   COPY "iot-on-earth-public".columnconstraints (constraint_id, constraint_name, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    226   ��       �          0    17467    columndatatypes 
   TABLE DATA           f   COPY "iot-on-earth-public".columndatatypes (type_id, type_name, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    224   ݭ       �          0    17485    columns 
   TABLE DATA           o   COPY "iot-on-earth-public".columns (clm_id, clm_name, data_type, tbl_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    228   ��       �          0    17504    constraintsofcolumn 
   TABLE DATA           q   COPY "iot-on-earth-public".constraintsofcolumn (id, clm_id, constraint_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    230   �                 0    17453 
   datatables 
   TABLE DATA           k   COPY "iot-on-earth-public".datatables (tbl_id, tbl_name, project_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    222   4�       }          0    17439    devices 
   TABLE DATA           �   COPY "iot-on-earth-public".devices (device_id, device_name, device_description, project_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    220   Q�       �          0    17556    gauges 
   TABLE DATA           w   COPY "iot-on-earth-public".gauges (id, widget_id, clm_id, max_value, gauge_type, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    236   n�       �          0    17575    parametertables 
   TABLE DATA           i   COPY "iot-on-earth-public".parametertables (id, widget_id, clm_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    238   ��       {          0    17425    projects 
   TABLE DATA           �   COPY "iot-on-earth-public".projects (project_id, project_name, description, fingerprint, user_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    218   ��       �          0    17537    toggles 
   TABLE DATA           p   COPY "iot-on-earth-public".toggles (id, widget_id, clm_id, write_enabled, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    234   Ů       y          0    17416    users 
   TABLE DATA           c   COPY "iot-on-earth-public".users (user_id, email, user_name, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    216   �       �          0    17594 
   variations 
   TABLE DATA           t   COPY "iot-on-earth-public".variations (id, widget_id, x_axis, variation_type, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    240   ��       �          0    17613    variationseries 
   TABLE DATA           l   COPY "iot-on-earth-public".variationseries (id, variation_id, clm_id, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    242   �       �          0    17523    widgets 
   TABLE DATA           ^   COPY "iot-on-earth-public".widgets (widget_id, dataset, create_time, update_time) FROM stdin;
    iot-on-earth-public          postgres    false    232   9�       �           0    0 #   columnconstraints_constraint_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('"iot-on-earth-public".columnconstraints_constraint_id_seq', 1, false);
          iot-on-earth-public          postgres    false    225            �           0    0    columndatatypes_type_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('"iot-on-earth-public".columndatatypes_type_id_seq', 1, false);
          iot-on-earth-public          postgres    false    223            �           0    0    columns_clm_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('"iot-on-earth-public".columns_clm_id_seq', 1, false);
          iot-on-earth-public          postgres    false    227            �           0    0    constraintsofcolumn_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('"iot-on-earth-public".constraintsofcolumn_id_seq', 1, false);
          iot-on-earth-public          postgres    false    229            �           0    0    datatables_tbl_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('"iot-on-earth-public".datatables_tbl_id_seq', 1, false);
          iot-on-earth-public          postgres    false    221            �           0    0    devices_device_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('"iot-on-earth-public".devices_device_id_seq', 1, false);
          iot-on-earth-public          postgres    false    219            �           0    0    gauges_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('"iot-on-earth-public".gauges_id_seq', 1, false);
          iot-on-earth-public          postgres    false    235            �           0    0    parametertables_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('"iot-on-earth-public".parametertables_id_seq', 1, false);
          iot-on-earth-public          postgres    false    237            �           0    0    projects_project_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('"iot-on-earth-public".projects_project_id_seq', 1, false);
          iot-on-earth-public          postgres    false    217            �           0    0    toggles_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('"iot-on-earth-public".toggles_id_seq', 1, false);
          iot-on-earth-public          postgres    false    233            �           0    0    users_user_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"iot-on-earth-public".users_user_id_seq', 1, false);
          iot-on-earth-public          postgres    false    215            �           0    0    variations_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('"iot-on-earth-public".variations_id_seq', 1, false);
          iot-on-earth-public          postgres    false    239            �           0    0    variationseries_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('"iot-on-earth-public".variationseries_id_seq', 1, false);
          iot-on-earth-public          postgres    false    241            �           0    0    widgets_widget_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('"iot-on-earth-public".widgets_widget_id_seq', 1, false);
          iot-on-earth-public          postgres    false    231            �           2606    17483 (   columnconstraints columnconstraints_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".columnconstraints
    ADD CONSTRAINT columnconstraints_pkey PRIMARY KEY (constraint_id);
 a   ALTER TABLE ONLY "iot-on-earth-public".columnconstraints DROP CONSTRAINT columnconstraints_pkey;
       iot-on-earth-public            postgres    false    226            �           2606    17474 $   columndatatypes columndatatypes_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY "iot-on-earth-public".columndatatypes
    ADD CONSTRAINT columndatatypes_pkey PRIMARY KEY (type_id);
 ]   ALTER TABLE ONLY "iot-on-earth-public".columndatatypes DROP CONSTRAINT columndatatypes_pkey;
       iot-on-earth-public            postgres    false    224            �           2606    17492    columns columns_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY "iot-on-earth-public".columns
    ADD CONSTRAINT columns_pkey PRIMARY KEY (clm_id);
 M   ALTER TABLE ONLY "iot-on-earth-public".columns DROP CONSTRAINT columns_pkey;
       iot-on-earth-public            postgres    false    228            �           2606    17511 ,   constraintsofcolumn constraintsofcolumn_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn
    ADD CONSTRAINT constraintsofcolumn_pkey PRIMARY KEY (id);
 e   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn DROP CONSTRAINT constraintsofcolumn_pkey;
       iot-on-earth-public            postgres    false    230            �           2606    17460    datatables datatables_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY "iot-on-earth-public".datatables
    ADD CONSTRAINT datatables_pkey PRIMARY KEY (tbl_id);
 S   ALTER TABLE ONLY "iot-on-earth-public".datatables DROP CONSTRAINT datatables_pkey;
       iot-on-earth-public            postgres    false    222            �           2606    17446    devices devices_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "iot-on-earth-public".devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (device_id);
 M   ALTER TABLE ONLY "iot-on-earth-public".devices DROP CONSTRAINT devices_pkey;
       iot-on-earth-public            postgres    false    220            �           2606    17563    gauges gauges_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY "iot-on-earth-public".gauges
    ADD CONSTRAINT gauges_pkey PRIMARY KEY (id);
 K   ALTER TABLE ONLY "iot-on-earth-public".gauges DROP CONSTRAINT gauges_pkey;
       iot-on-earth-public            postgres    false    236            �           2606    17582 $   parametertables parametertables_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY "iot-on-earth-public".parametertables
    ADD CONSTRAINT parametertables_pkey PRIMARY KEY (id);
 ]   ALTER TABLE ONLY "iot-on-earth-public".parametertables DROP CONSTRAINT parametertables_pkey;
       iot-on-earth-public            postgres    false    238            �           2606    17432    projects projects_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY "iot-on-earth-public".projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);
 O   ALTER TABLE ONLY "iot-on-earth-public".projects DROP CONSTRAINT projects_pkey;
       iot-on-earth-public            postgres    false    218            �           2606    17544    toggles toggles_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY "iot-on-earth-public".toggles
    ADD CONSTRAINT toggles_pkey PRIMARY KEY (id);
 M   ALTER TABLE ONLY "iot-on-earth-public".toggles DROP CONSTRAINT toggles_pkey;
       iot-on-earth-public            postgres    false    234            �           2606    17423    users users_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY "iot-on-earth-public".users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 I   ALTER TABLE ONLY "iot-on-earth-public".users DROP CONSTRAINT users_pkey;
       iot-on-earth-public            postgres    false    216            �           2606    17601    variations variations_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY "iot-on-earth-public".variations
    ADD CONSTRAINT variations_pkey PRIMARY KEY (id);
 S   ALTER TABLE ONLY "iot-on-earth-public".variations DROP CONSTRAINT variations_pkey;
       iot-on-earth-public            postgres    false    240            �           2606    17620 $   variationseries variationseries_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY "iot-on-earth-public".variationseries
    ADD CONSTRAINT variationseries_pkey PRIMARY KEY (id);
 ]   ALTER TABLE ONLY "iot-on-earth-public".variationseries DROP CONSTRAINT variationseries_pkey;
       iot-on-earth-public            postgres    false    242            �           2606    17530    widgets widgets_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "iot-on-earth-public".widgets
    ADD CONSTRAINT widgets_pkey PRIMARY KEY (widget_id);
 M   ALTER TABLE ONLY "iot-on-earth-public".widgets DROP CONSTRAINT widgets_pkey;
       iot-on-earth-public            postgres    false    232            �           2606    17493    columns columns_data_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".columns
    ADD CONSTRAINT columns_data_type_fkey FOREIGN KEY (data_type) REFERENCES "iot-on-earth-public".columndatatypes(type_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY "iot-on-earth-public".columns DROP CONSTRAINT columns_data_type_fkey;
       iot-on-earth-public          postgres    false    4804    224    228            �           2606    17498    columns columns_tbl_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".columns
    ADD CONSTRAINT columns_tbl_id_fkey FOREIGN KEY (tbl_id) REFERENCES "iot-on-earth-public".datatables(tbl_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY "iot-on-earth-public".columns DROP CONSTRAINT columns_tbl_id_fkey;
       iot-on-earth-public          postgres    false    4802    222    228            �           2606    17512 3   constraintsofcolumn constraintsofcolumn_clm_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn
    ADD CONSTRAINT constraintsofcolumn_clm_id_fkey FOREIGN KEY (clm_id) REFERENCES "iot-on-earth-public".columns(clm_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 l   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn DROP CONSTRAINT constraintsofcolumn_clm_id_fkey;
       iot-on-earth-public          postgres    false    228    230    4808            �           2606    17517 :   constraintsofcolumn constraintsofcolumn_constraint_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn
    ADD CONSTRAINT constraintsofcolumn_constraint_id_fkey FOREIGN KEY (constraint_id) REFERENCES "iot-on-earth-public".columnconstraints(constraint_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 s   ALTER TABLE ONLY "iot-on-earth-public".constraintsofcolumn DROP CONSTRAINT constraintsofcolumn_constraint_id_fkey;
       iot-on-earth-public          postgres    false    4806    226    230            �           2606    17461 %   datatables datatables_project_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".datatables
    ADD CONSTRAINT datatables_project_id_fkey FOREIGN KEY (project_id) REFERENCES "iot-on-earth-public".projects(project_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ^   ALTER TABLE ONLY "iot-on-earth-public".datatables DROP CONSTRAINT datatables_project_id_fkey;
       iot-on-earth-public          postgres    false    222    218    4798            �           2606    17447    devices devices_project_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".devices
    ADD CONSTRAINT devices_project_id_fkey FOREIGN KEY (project_id) REFERENCES "iot-on-earth-public".projects(project_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY "iot-on-earth-public".devices DROP CONSTRAINT devices_project_id_fkey;
       iot-on-earth-public          postgres    false    218    4798    220            �           2606    17569    gauges gauges_clm_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".gauges
    ADD CONSTRAINT gauges_clm_id_fkey FOREIGN KEY (clm_id) REFERENCES "iot-on-earth-public".columns(clm_id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY "iot-on-earth-public".gauges DROP CONSTRAINT gauges_clm_id_fkey;
       iot-on-earth-public          postgres    false    4808    228    236            �           2606    17564    gauges gauges_widget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".gauges
    ADD CONSTRAINT gauges_widget_id_fkey FOREIGN KEY (widget_id) REFERENCES "iot-on-earth-public".widgets(widget_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY "iot-on-earth-public".gauges DROP CONSTRAINT gauges_widget_id_fkey;
       iot-on-earth-public          postgres    false    4812    232    236            �           2606    17588 +   parametertables parametertables_clm_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".parametertables
    ADD CONSTRAINT parametertables_clm_id_fkey FOREIGN KEY (clm_id) REFERENCES "iot-on-earth-public".columns(clm_id) ON UPDATE CASCADE ON DELETE CASCADE;
 d   ALTER TABLE ONLY "iot-on-earth-public".parametertables DROP CONSTRAINT parametertables_clm_id_fkey;
       iot-on-earth-public          postgres    false    228    238    4808            �           2606    17583 .   parametertables parametertables_widget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".parametertables
    ADD CONSTRAINT parametertables_widget_id_fkey FOREIGN KEY (widget_id) REFERENCES "iot-on-earth-public".widgets(widget_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 g   ALTER TABLE ONLY "iot-on-earth-public".parametertables DROP CONSTRAINT parametertables_widget_id_fkey;
       iot-on-earth-public          postgres    false    232    238    4812            �           2606    17433    projects projects_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES "iot-on-earth-public".users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY "iot-on-earth-public".projects DROP CONSTRAINT projects_user_id_fkey;
       iot-on-earth-public          postgres    false    218    216    4796            �           2606    17550    toggles toggles_clm_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".toggles
    ADD CONSTRAINT toggles_clm_id_fkey FOREIGN KEY (clm_id) REFERENCES "iot-on-earth-public".columns(clm_id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY "iot-on-earth-public".toggles DROP CONSTRAINT toggles_clm_id_fkey;
       iot-on-earth-public          postgres    false    234    228    4808            �           2606    17545    toggles toggles_widget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".toggles
    ADD CONSTRAINT toggles_widget_id_fkey FOREIGN KEY (widget_id) REFERENCES "iot-on-earth-public".widgets(widget_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY "iot-on-earth-public".toggles DROP CONSTRAINT toggles_widget_id_fkey;
       iot-on-earth-public          postgres    false    234    232    4812            �           2606    17602 $   variations variations_widget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".variations
    ADD CONSTRAINT variations_widget_id_fkey FOREIGN KEY (widget_id) REFERENCES "iot-on-earth-public".widgets(widget_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY "iot-on-earth-public".variations DROP CONSTRAINT variations_widget_id_fkey;
       iot-on-earth-public          postgres    false    232    4812    240            �           2606    17607 !   variations variations_x_axis_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".variations
    ADD CONSTRAINT variations_x_axis_fkey FOREIGN KEY (x_axis) REFERENCES "iot-on-earth-public".columns(clm_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY "iot-on-earth-public".variations DROP CONSTRAINT variations_x_axis_fkey;
       iot-on-earth-public          postgres    false    240    228    4808            �           2606    17626 +   variationseries variationseries_clm_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".variationseries
    ADD CONSTRAINT variationseries_clm_id_fkey FOREIGN KEY (clm_id) REFERENCES "iot-on-earth-public".columns(clm_id) ON UPDATE CASCADE ON DELETE CASCADE;
 d   ALTER TABLE ONLY "iot-on-earth-public".variationseries DROP CONSTRAINT variationseries_clm_id_fkey;
       iot-on-earth-public          postgres    false    242    228    4808            �           2606    17621 1   variationseries variationseries_variation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".variationseries
    ADD CONSTRAINT variationseries_variation_id_fkey FOREIGN KEY (variation_id) REFERENCES "iot-on-earth-public".variations(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 j   ALTER TABLE ONLY "iot-on-earth-public".variationseries DROP CONSTRAINT variationseries_variation_id_fkey;
       iot-on-earth-public          postgres    false    242    240    4820            �           2606    17531    widgets widgets_dataset_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "iot-on-earth-public".widgets
    ADD CONSTRAINT widgets_dataset_fkey FOREIGN KEY (dataset) REFERENCES "iot-on-earth-public".datatables(tbl_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY "iot-on-earth-public".widgets DROP CONSTRAINT widgets_dataset_fkey;
       iot-on-earth-public          postgres    false    232    222    4802            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �            x������ � �      }      x������ � �      �      x������ � �      �      x������ � �      {      x������ � �      �      x������ � �      y      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     