const roles=["owner","manager","employee","read_only","edit_only"
]

export const roleList = roles.map((role) => ({
  label: role,
  value: role,
}));