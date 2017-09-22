create table <%= tableName %> (
  id serial not null primary key,
  <% properties.forEach(function (property, index) { %>
  <%= property.name %> <%= property.type %> <%= property.required ? 'not null' : '' %><%= index === properties.length - 1 ? '' : ',' %>
  <% }) %>
);
