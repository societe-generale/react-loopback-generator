create table "user" (
  id serial not null primary key,
  email text not null unique,
  password text not null,
  username text,
  credentials text,
  challenges text,
  emailverified boolean,
  verificationtoken boolean,
  status text,
  created timestamp with time zone default now(),
  lastupdated timestamp with time zone,
  realm text
);

create table accesstoken (
  id text not null unique primary key,
  ttl integer not null,
  created timestamp with time zone default now(),
  userid integer not null references "user"(id)
);

create table acl (
  id serial not null primary key,
  model text,
  property text,
  accesstype text,
  permission text,
  principaltype text,
  principalid text
);

create table role (
  id text not null unique primary key,
  name text not null unique,
  description text,
  created timestamp with time zone default now(),
  lastupdated timestamp with time zone
);

create table rolemapping (
  id text not null unique primary key,
  principaltype text not null,
  principalid text not null,
  roleid text not null
);
