create table sguser (
  id serial not null primary key,
  email text not null unique,
  password text not null,
  username text,
  credentials text,
  challenges text,
  emailverified boolean,
  verificationtoken boolean,
  status text,
  modified timestamp with time zone default now(),
  realm text,
  firstname text,
  lastname text,
  roles json,
  uid text
);

create table accesstoken (
  id text not null unique primary key,
  ttl integer not null,
  created timestamp with time zone default now(),
  userid integer not null references sguser(id)
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
  id serial not null primary key,
  name text not null unique,
  description text,
  created timestamp with time zone default now(),
  modified timestamp with time zone
);

create table rolemapping (
  id serial not null primary key,
  principaltype text not null,
  principalid text not null,
  roleid text not null
);

create function update_modified_column()
returns trigger as $$
begin
    NEW.modified = now();
    return NEW;
end;
$$ language 'plpgsql';

create trigger update_sguser_modified_column
before update on sguser for each row execute procedure update_modified_column();
