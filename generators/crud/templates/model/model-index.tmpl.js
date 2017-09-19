<% viewTypes.forEach(function (viewType, index) { %>
  import <%= `${modelNameCamelCase}${viewTypesCapitalized[index]}ViewContainer` %> from '<%= `./${modelNameSnakeCase}/${viewType}-view` %>';
<% }) %>

export default {
  '<%- modelNameSnakeCase %>' : {
    list: <%= modelNameCamelCase %>ListViewContainer,
    create: <%= modelNameCamelCase %>CreateViewContainer,
    edit: <%= modelNameCamelCase %>EditViewContainer,
  },
};