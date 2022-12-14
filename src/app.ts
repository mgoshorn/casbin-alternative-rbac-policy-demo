import { Enforcer, newEnforcer } from 'casbin';

console.log(`Starting app`);

async function test(enforcer: Enforcer) {
  console.log(await enforcer.enforce('user1', 'tenant1', 'users', 'read-own'));
  // False
  console.log(await enforcer.enforce('user1', 'tenant2', 'users', 'read-own'));

  // False - user2 role is associated with tenant2 - they have no role associated with tenant1
  console.log(await enforcer.enforce('user2', 'tenant1', 'users', 'read-own'));
  // True
  console.log(await enforcer.enforce('user2', 'tenant2', 'users', 'read-own'));
}

(async () => {
  const enforcer = await newEnforcer('model.conf', 'policy.conf');
  await test(enforcer);

  const oldEnforcer = await newEnforcer('old_model.conf', 'old_policy.conf');
  await test(oldEnforcer);
})();
