import Course from "./Course.js";

const startDate = new Date();
startDate.setDate(startDate.getDate() + 50);
const codingCourse = new Course('Coding course', startDate, 10);
if (codingCourse.isAvailable(1)) {
	codingCourse.bookCourse(1);
} else {
	throw new Error('Can`t book a course');
}
