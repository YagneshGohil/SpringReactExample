'use strict';

// Load modules

import { unlink } from 'fs';
import { promisify } from 'util';
import { ignore } from '@hapi/bounce';
import Code from '@hapi/code';
import { script } from '@hapi/lab';
import { event } from 'toys';
import { run } from 'newman';
import { deployment } from '../server';

// Test shortcuts

const { describe, it } = exports.lab = script();
const { expect } = Code;

describe('Deployment', () => {

    const dropDb = async () => {

        try {
            await promisify(unlink)('.test.db');
        }
        catch (error) {
            ignore(error, { code: 'ENOENT' });
        }
    };

    it('allows a user to login, signup, then fetch their user info.', async () => {

        await dropDb();

        const server = await deployment();

        const signup = await server.inject({
            method: 'post',
            url: '/api/users',
            payload: {
                user: {
                    username: 'test-user',
                    password: 'test-pass',
                    email: 'x@y.com'
                }
            }
        });

        expect(signup.statusCode).to.equal(200);
        expect(signup.result).to.equal({
            user: {
                id: 1,
                username: 'test-user',
                email: 'x@y.com',
                bio: null,
                image: null,
                token: signup.result.user.token
            }
        });

        expect(signup.result.user.token).to.be.a.string();

        const login = await server.inject({
            method: 'post',
            url: '/api/users/login',
            payload: {
                user: {
                    email: 'x@y.com',
                    password: 'test-pass'
                }
            }
        });

        expect(login.statusCode).to.equal(200);
        expect(login.result).to.equal({
            user: {
                id: 1,
                username: 'test-user',
                email: 'x@y.com',
                bio: null,
                image: null,
                token: login.result.user.token
            }
        });

        expect(login.result.user.token).to.be.a.string();

        const getCurrentUser = await server.inject({
            method: 'get',
            url: '/api/user',
            headers: {
                authorization: `Token ${login.result.user.token}`
            }
        });

        expect(getCurrentUser.statusCode).to.equal(200);
        expect(getCurrentUser.result).to.equal({
            user: {
                id: 1,
                username: 'test-user',
                email: 'x@y.com',
                bio: null,
                image: null,
                token: login.result.user.token
            }
        });
    });

    it('passes postman tests.', { timeout: 5000 }, async (flags) => {

        await dropDb();

        const server = await deployment();

        await server.start();

        flags.onCleanup = async () => await server.stop();

        // Create a user to follow/unfollow (referenced within postman collection)

        await server.services().userService.signup({
            username: 'rick',
            password: 'secret-rick',
            email: 'rick@rick.com'
        });

        // Run postman tests

        const newman = run({
            reporters: 'cli',
            collection: require('./postman-collection.json'),
            environment: {
                values: [
                    {
                        enabled: true,
                        key: 'apiUrl',
                        value: `${server.info.uri}/api`,
                        type: 'text'
                    }
                ]
            }
        });

        await event(newman, 'done');

        expect(newman.summary.run.error).to.not.exist();
        expect(newman.summary.run.failures.length).to.equal(0);
    });
});
export default withRouter(NewMan2);