import db from '../../config/sequelize';
import { Op } from 'sequelize';
import { TPaginationParams, TPaginationResponse } from '../types/searchParams';
import {
	TUserListDetails,
	TUserListDetailsForAdmin,
	TUserPublicDetailsWithExperienceAndExperience,
} from '../types/user';

const DB: any = db;
const { User, Business, BusinessUser, Education, Experience } = DB;

function createNewUser(data: any) {
	return User.create(data);
}

function activateAccount(userId: string) {
	return User.update(
		{ isActive: true },
		{
			where: {
				id: userId,
			},
		},
	);
}

// security risk if this api is exposed to public
function findUserByEmail(email: string) {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'role',
			'password',
			'isActive',
		],
		where: {
			email,
		},
	});
}

function findActiveUserByEmail(email: string) {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'role',
			'password',
			'isActive',
		],
		where: {
			email,
			isActive: true,
		},
		include: [
			{
				model: BusinessUser,
				attributes: ['businessId', 'role'],
				as: 'usersInBusiness',
				include: [
					{
						model: Business,
						attributes: ['id', 'name'],
						as: 'businessUserInBusiness',
					},
				],
			},
		],
	});
}

function findUserById(userId: string) {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'role',
			'bio',
		],
		where: {
			id: userId,
		},
		include: [
			{
				model: BusinessUser,
				attributes: ['businessId', 'role'],
				as: 'usersInBusiness',
				include: [
					{
						model: Business,
						attributes: ['id', 'name'],
						as: 'businessUserInBusiness',
					},
				],
			},
		],
	});
}

function findPublicProfileById(
	userId: string,
): Promise<TUserPublicDetailsWithExperienceAndExperience> {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'bio',
			'createdAt',
		],
		where: {
			id: userId,
		},
		include: [
			{
				model: Education,
			},
			{
				model: Experience,
			},
		],
		order: [['Education', 'startDate', 'ASC']],
	});
}

function findUserByIdForBusiness(userId: string) {
	return User.findOne({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'role',
			'bio',
		],
		where: {
			id: userId,
		},
		include: [
			{
				model: BusinessUser,
				attributes: ['businessId', 'role'],
				as: 'usersInBusiness',
				include: [
					{
						model: Business,
						attributes: ['id', 'name'],
						as: 'businessUserInBusiness',
					},
				],
			},
		],
	});
}

// security risk if this api is exposed to public
function findUserPasswordByEmail(email: string) {
	return User.findOne({
		attributes: ['id', 'password'],
		where: {
			email,
			isActive: true,
		},
		include: [
			{
				model: BusinessUser,
				attributes: ['businessId'],
				as: 'usersInBusiness',
				include: [
					{
						model: Business,
						attributes: ['id', 'name'],
						as: 'businessUserInBusiness',
					},
				],
			},
		],
	});
}

async function listAllUsers(paginationParams: TPaginationParams): Promise<{
	pagination: TPaginationResponse;
	rows: TUserListDetailsForAdmin[];
}> {
	const records: {
		count: number;
		rows: TUserListDetailsForAdmin[];
	} = await User.findAndCountAll({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'role',
			'isActive',
		],
		offset: (paginationParams.page - 1) * paginationParams.limit,
		limit: paginationParams.limit,
		order: [[paginationParams.sort_by, paginationParams.sort_order]],
	});
	const pagination = {
		currentPage: paginationParams.page,
		pageSize: paginationParams.limit,
		totalPages: Math.ceil(records.count / paginationParams.limit),
		totalRecords: records.count,
	};
	return {
		pagination,
		rows: records.rows,
	};
}

async function updateUserPassword(userId: string, password: string) {
	const user = await User.findOne({
		where: {
			id: userId,
		},
	});
	if (user) {
		user.password = password;
		await user.save();
	}
	return user;
}

export default {
	listAllUsers,
	activateAccount,
	createNewUser,
	findUserByEmail,
	findActiveUserByEmail,
	findUserById,
	findUserPasswordByEmail,
	updateUserPassword,
};
