import * as UserTypes from '../../types/userTypes'
import * as Data from '../data'
import { ErrorCodeTranslator } from '../errorCodeTranslator';
import { ApiRequestFetcher, ApiRequestType} from 'utils'

export const AddLecture = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.Lecture,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Lecture } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/lectures`;
  const apiResult: { code: number, message: string, data: UserTypes.Lecture } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

export const AddStudent = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.Student,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Student } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/students`;
  const apiResult: { code: number, message: string, data: UserTypes.Student } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

export const AddStudents = async (
  context: UserTypes.ApiContext,
  postDatas: UserTypes.Student[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Student[] } > => {
  
	const responseResults = new Array();
	const responseDatas = new Array();
  for (const postData of postDatas) {
		const res = await AddStudent(context, postData);
		responseResults.push(res.result);
		responseDatas.push(res.data)
	}
	
	return {
    result: responseResults[0].result,
    data: responseDatas,
  };
}

export const AddTeacher = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.Teacher,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Teacher } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/teachers`;
  const apiResult: { code: number, message: string, data: UserTypes.Teacher } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

export const AddLectureSchedule = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.LectureSchedule,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.LectureSchedule } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/lecture_schedules`;
  const apiResult: { code: number, message: string, data: UserTypes.LectureSchedule } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

export const AddTeachingMaterial = async (
  context: UserTypes.ApiContext,
  postData: UserTypes.TeachingMaterial,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.TeachingMaterial } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/teaching_materials`;
  const apiResult: { code: number, message: string, data: UserTypes.TeachingMaterial } =
    await ApiRequestFetcher(address, ApiRequestType.POST, postData);
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

export const AddLectureWithOptionData = async (
  context: UserTypes.ApiContext,
  lecture: UserTypes.Lecture,
  students: UserTypes.Student[],
  teachers: UserTypes.Teacher[],
  schedules: UserTypes.LectureSchedule[],
  materials: UserTypes.TeachingMaterial[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.LectureWithOptionData } > => {
  
	let result = new UserTypes.AppResult();
	await AddLecture(context, lecture)
		.then(apiResult => {
			result = apiResult.result;
			students.forEach(student => { student.lecture_id = apiResult.data.id; })
			teachers.forEach(teacher => { teacher.lecture_id = apiResult.data.id; })
			schedules.forEach(schedule => { schedule.lecture_id = apiResult.data.id; })
			materials.forEach(material => { material.lecture_id = apiResult.data.id; })
		})
	
	if (result.Code == UserTypes.AppErrorCode.Success) {
		await Promise.all([
			AddStudents(context, students),
		]).catch(error => {
			console.log(error);
		});
	}

	return {
    result: ErrorCodeTranslator.ToAppResult(200),
    data: new UserTypes.LectureWithOptionData(),
  };
}

