import test from 'ava';
import Course from "../src/Course.js";
import sinon from "sinon";
import fs from "fs";

test('Start time is not a date', t => {
	const course = new Course('Example', {}, 100);
	const error = t.throws(() => {
		course.isAvailable(5);
	}, { instanceOf: Error });

	t.is(error.message, 'startDate must be a object');
});

test('requiredPlaces is not a number', t => {
	const d = new Date();
	d.setDate(d.getDate() + 50);
	const course = new Course('Example', d, 100);
	const error = t.throws(() => {
		course.isAvailable('5');
	}, { instanceOf: Error });

	t.is(error.message, 'requiredPlaces must be a number');
});

test('availablePlaces is not a number', t => {
	const d = new Date();
	d.setDate(d.getDate() + 50);
	const course = new Course('Example', d, '100');
	const error = t.throws(() => {
		course.isAvailable(5);
	}, { instanceOf: Error });

	t.is(error.message, 'availablePlaces must be a number');
});

test('Course startDate passed', t => {
	const d = new Date();
	d.setDate(d.getDate() - 50);
	const course = new Course('Example', d, 100);
	t.false(course.isAvailable(5))
});

test('requiredPlaces is bigger than availablePlaces', t => {
	const d = new Date();
	d.setDate(d.getDate() + 50);
	const course = new Course('Example', d, 5);
	t.false(course.isAvailable(10))
});

test('Course is available to book', t => {
	const d = new Date();
	d.setDate(d.getDate() + 50);
	const course = new Course('Example', d, 50);
	t.true(course.isAvailable(10))
});

test('Book a course', t => {
	const fsFake = sinon.replace(fs, "writeFile", sinon.fake.returns());

	const d = new Date();
	d.setDate(d.getDate() + 50);
	const course = new Course('Example', d, 50);
	course.bookCourse(5);

	t.true(fsFake.calledOnce);
	t.is(fsFake.firstArg, 'booked_course.txt');
	t.is(fsFake.args[0][1], 'Example : 5');
	sinon.restore();
});

test('Book a course throw a error', t => {
	const fsFake = sinon.replace(fs, "writeFile", sinon.fake.throws('error'));

	const d = new Date();
	d.setDate(d.getDate() + 50);
	const course = new Course('Example', d, 50);

	t.throws(() => {
		course.bookCourse(5);
	}, { instanceOf: Error });

	t.true(fsFake.calledOnce);
});
