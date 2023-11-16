import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { format, formatDuration, intervalToDuration } from 'date-fns';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService) { }

    async user(
        params: {
            userId?: string,
            username?: string,
        }
    ) {
        let { userId, username } = params;
        let user = await this.prisma.users.findUnique({
            where: {
                ...{ ...userId && { id: userId } },
                ...{ ...username && { username: username } }
            },
        });
        return { username: user.username }
    }
}
