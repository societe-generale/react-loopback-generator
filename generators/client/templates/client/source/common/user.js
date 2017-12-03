// @flow
export type Role = {
  name: string,
};

export type User = {
  firstName: string,
  roles?: Array<Role>,
};
