export function isRequestingOwnUser (context, args) {
    return context.username !== undefined &&
          context.username === args.studentUsername
  }