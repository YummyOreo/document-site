export function getAllRoles(message: { guild: { roles: any[] } }) {
  message.guild.roles.forEach((role: { name: any; id: any }) =>
    console.log(role.name, role.id)
  );
}
