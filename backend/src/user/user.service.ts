import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserAuth } from 'src/user-auth/user-auth.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        @InjectRepository(User) private userAuthRepo: Repository<UserAuth>,
    ) {}

    async create(_input: CreateUserInput, _userAuth?: UserAuth): Promise<User> {
        const { userAuthId, ...input } = _input;
        let userAuth = _userAuth;

        if (!userAuth) {
            userAuth = await this.userAuthRepo.findOne({ where: { id: userAuthId } });
        }

        if (!userAuth) {
            throw new Error(`UserService::create() - cannot find user auth with id: ${userAuthId}`);
        }

        const user = await this.repo.save({
            ...input,
            userAuth,
        });

        return user;
    }

    findAll() {
        return `This action returns all user`;
    }

    findById(id: string, relations: FindOneOptions<User>['relations'] = {}) {
        return this.repo.findOne({ where: { id }, relations });
    }

    update(input: UpdateUserInput) {
        return `This action updates a #${input.id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async addUserToCurrentUserFriends(currentUserId: string, friendUserId: string) {
        const currentUser = await this.repo.findOne({ where: { id: currentUserId }, relations: { friends: true } });

        if (!currentUser) {
            throw new Error(
                `UserService::addUserToCurrentUserFriends() - could not find current user (ID: ${currentUserId})`,
            );
        }

        const friend = await this.repo.findOne({ where: { id: friendUserId }, relations: { friends: true } });

        if (!friend) {
            throw new Error(`UserService::addUserToCurrentUserFriends() - could not find friend (ID: ${friendUserId})`);
        }

        currentUser.friends.push(friend);
        friend.friends.push(currentUser);

        await this.repo.save(currentUser);
        await this.repo.save(friend);

        return currentUser;
    }

    async inviteFriend(currentUserId: string, friendUserId: string) {
        const currentUser = await this.repo.findOne({
            where: { id: currentUserId },
            relations: { friendInvitations: true },
        });

        if (!currentUser) {
            throw new Error(`UserService::inviteFriend() - could not find current user (ID: ${currentUserId})`);
        }

        if (!currentUser.friendInvitations) {
            currentUser.friendInvitations = [];
        }

        const friend = await this.repo.findOne({ where: { id: friendUserId }, relations: { friends: true } });

        if (!friend) {
            throw new Error(`UserService::inviteFriend() - could not find friend (ID: ${friendUserId})`);
        }

        currentUser.friendInvitations.push(friend);

        return this.repo.save(currentUser);
    }

    async acceptFriendInvitation(currentUserId: string, friendUserId: string): Promise<void> {
        const currentUser = await this.repo.findOne({
            where: { id: currentUserId },
            relations: { friendInvitations: true },
        });

        if (!currentUser) {
            throw new Error(
                `UserService::acceptFriendInvitation() - could not find current user (ID: ${currentUserId})`,
            );
        }

        const friend = currentUser.friendInvitations.find((invitation) => invitation.id === friendUserId);
        if (!friend) {
            throw new Error(
                `UserService::acceptFriendInvitation() - could not find friend invitation (ID: ${friendUserId})`,
            );
        }

        friend.isAccepted = true;

        currentUser.friends.push(friend);
        friend.friends.push(currentUser);

        currentUser.friendInvitations = currentUser.friendInvitations.filter(
            (invitation) => invitation.id !== friendUserId,
        );

        await this.repo.save(currentUser);
        await this.repo.save(friend);
    }

    async sentFriendInvitations(userId: string) {
        const user = await this.repo.findOne({ where: { id: userId }, relations: { friendInvitations: true } });
        return user.friendInvitations;
    }

    async pendingFriendInvitations(userId: string) {
        const user = await this.repo.findOne({ where: { id: userId }, relations: { friendInvitations: true } });
        const pendingInvitations: User[] = user.friendInvitations.filter((invitation) => !invitation.isAccepted);
        return pendingInvitations;
    }
}
