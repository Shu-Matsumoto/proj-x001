import * as UserTypes from '../../types/userTypes'
import { ErrorCodeTranslator } from '../errorCodeTranslator';
import { ApiRequestFetcher, ApiRequestType} from 'utils'

// 講義新規追加
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
// 生徒新規追加(1件)
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

// 生徒取得(1件)
export const GetStudent = async (
  context: UserTypes.ApiContext,
  student_id: number,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Student } > => {
  const address = `${context.apiRootUrl.replace(/\/$/g, '')}/students/${student_id}`;
  const apiResult: { code: number, message: string, data: UserTypes.Student } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

// 生徒新規追加(複数件バッチ)
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
// 講師新規追加(1件)
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
// 講師新規追加(複数件バッチ)
export const AddTeachers = async (
  context: UserTypes.ApiContext,
  postDatas: UserTypes.Teacher[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Teacher[] } > => {
  
	const responseResults = new Array();
	const responseDatas = new Array();
  for (const postData of postDatas) {
		const res = await AddTeacher(context, postData);
		responseResults.push(res.result);
		responseDatas.push(res.data)
	}
	
	return {
    result: responseResults[0].result,
    data: responseDatas,
  };
}
// 講義日程新規追加(1件)
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
// 講義新規追加(複数件バッチ)
export const AddLectureSchedules = async (
  context: UserTypes.ApiContext,
  postDatas: UserTypes.LectureSchedule[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.LectureSchedule[] } > => {
  
	const responseResults = new Array();
	const responseDatas = new Array();
  for (const postData of postDatas) {
		const res = await AddLectureSchedule(context, postData);
		responseResults.push(res.result);
		responseDatas.push(res.data)
	}
	
	return {
    result: responseResults[0].result,
    data: responseDatas,
  };
}
// 教材新規追加(1件)
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
// 教材新規追加(複数件バッチ)
export const AddTeachingMaterials = async (
  context: UserTypes.ApiContext,
  postDatas: UserTypes.TeachingMaterial[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.TeachingMaterial[] } > => {
  
	const responseResults = new Array();
	const responseDatas = new Array();
  for (const postData of postDatas) {
		const res = await AddTeachingMaterial(context, postData);
		responseResults.push(res.result);
		responseDatas.push(res.data)
	}
	
	return {
    result: responseResults[0].result,
    data: responseDatas,
  };
}
// 講義新規追加(関連情報ALL)
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
      // 講義情報登録後に紐づけ必要なlecture_idをその他情報へセット
			students.forEach(student => { student.lecture_id = apiResult.data.id; })
			teachers.forEach(teacher => { teacher.lecture_id = apiResult.data.id; })
			schedules.forEach(schedule => { schedule.lecture_id = apiResult.data.id; })
			materials.forEach(material => { material.lecture_id = apiResult.data.id; })
		})
	
	if (result.Code == UserTypes.AppErrorCode.Success) {
		await Promise.all([
      AddStudents(context, students),
      AddTeachers(context, teachers),
      AddLectureSchedules(context, schedules),
      AddTeachingMaterials(context, materials),
		]).catch(error => {
			console.log(error);
		});
	}

	return {
    result: ErrorCodeTranslator.ToAppResult(200),
    data: new UserTypes.LectureWithOptionData(),
  };
}

// 特定講義取得
export const GetLecture = async (
  context: UserTypes.ApiContext,
  lecture_id: number,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Lecture } > => {
  
	const address = `${context.apiRootUrl.replace(/\/$/g, '')}/lectures/${lecture_id}`;
  const apiResult: { code: number, message: string, data: UserTypes.Lecture } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

export const GetLectureWithOptionData = async (
  context: UserTypes.ApiContext,
  lecture_id: number,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.LectureWithOptionData } > => {
  
	const address = `${context.apiRootUrl.replace(/\/$/g, '')}/lectures/${lecture_id}/detail`;
  console.log(address);
  const apiResult: { code: number, message: string, data: UserTypes.LectureWithOptionData } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data
  };
}

// 講義一覧取得(ユーザID指定)
export const GetLectures = async (
  context: UserTypes.ApiContext,
  user_id: number,
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Lecture[] } > => {
  
	const address = `${context.apiRootUrl.replace(/\/$/g, '')}/${user_id}/lectures`;
  const apiResult: { code: number, message: string, data: UserTypes.Lecture[] } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

// 講義検索
export const SearchLectures = async (
  context: UserTypes.ApiContext,
  conditions: string[],
): Promise<{ result: UserTypes.AppResult, data: UserTypes.Lecture[] } > => {
  const user_id = 1;
	const address = `${context.apiRootUrl.replace(/\/$/g, '')}/${user_id}/lectures`;
  const apiResult: { code: number, message: string, data: UserTypes.Lecture[] } =
    await ApiRequestFetcher(address, ApiRequestType.GET, null);  
  console.log(apiResult);
  return {
    result: ErrorCodeTranslator.ToAppResult(apiResult.code),
    data: apiResult.data,
  };
}

