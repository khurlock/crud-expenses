import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
    {
        id: "Expense1",
        title: "$55",
        authorId: "Auto & Transport",
        category: "gas"
    },
    {
        id: "Expense2",
        title: "$500",
        authorId: "Bills & Utilities",
        category: "rent"
    },
    {
        id: "Expense3",
        title: "$11",
        authorId: "Food & Dining",
        category: "lunch"
    },
    {
        id: "Expense4",
        title: "$234",
        authorId: "Education",
        category: "books"
    },
    {
        id: "Expense5",
        title: "$250",
        authorId: "Entertainment",
        category: "concert tickets"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
    return replaceAll(course.title, ' ', '-');
};

class CourseApi {
    static getAllCourses() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], courses));
            }, delay);
        });
    }

    static saveCourse(course) {
        course = Object.assign({}, course); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minCourseTitleLength = 1;
                if (course.title.length < minCourseTitleLength) {
                    reject(`Title must be at least ${minCourseTitleLength} characters.`);
                }

                if (course.id) {
                    const existingCourseIndex = courses.findIndex(a => a.id === course.id);
                    courses.splice(existingCourseIndex, 1, course);
                } else {
                    //Just simulating creation here.
                    //Cloning so copy returned is passed by value rather than by reference.
                    course.id = generateId(course);
                    courses.push(course);
                }

                resolve(course);
            }, delay);
        });
    }

    static deleteCourse(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfCourseToDelete = courses.findIndex(course => course.id === courseId);
                courses.splice(indexOfCourseToDelete, 1);
                resolve();
            }, delay);
        });
    }


    static getCourse(courseId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingCourseIndex = courses.findIndex(course => course.id === courseId);
                
                const courseFound = Object.assign({}, courses[existingCourseIndex]);

                resolve(courseFound);

            }, delay);
        });
    }

}

export default CourseApi;
