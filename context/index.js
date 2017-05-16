import Ready from '../lib/ready'
import userCreator from './user-login'
import userService from './user'

const context = {}

export default function contextCreator(done) {
  const services = new Ready()
  userCreator(context, services.add('userLogin'))
  context.services = {}
  context.services['user'] = userService
  services.ready(done)
}
export { context }