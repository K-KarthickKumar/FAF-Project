import React,{useState} from 'react';
import './json.css';

export default function Json() {

    const json = {
        "course": {
          "courseId": 1,
          "courseName": "Google Cloud Platform Fundamentals: Big Data & Machine Learning",
          "courseCode": "GCP-BDML",
          "courseCategory": {
            "courseCategoryId": 1,
            "name": "Cloud computing"
          },
          "courseTechnology": {
            "technologyId": 1,
            "name": "cloud"
          },
          "coursePartner": {
            "partnerId": 3,
            "name": "google"
          },
          "courseDuration": 0,
          "courseConent": {
            "description": "This one-day instructor-led course introduces participants to the big data capabilities of Google Cloud Platform. Through a combination of presentations, demos, and hands-on labs, participants get an overview of the Google Cloud platform and a detailed view of the data processing and machine learning capabilities. This course showcases the ease, flexibility, and power of big data solutions on Google Cloud Platform.",
            "heighlights": "",
            "courseIncluded": [
              "22 hours on-demand video",
              "19 coding exercises",
              "5 articles",
              "Certificate of completion",
              "Closed captions"
            ],
            "objectives": {
              "description": "This course teaches participants the following skills",
              "summary": "",
              "objectiveList": [
                "Identify the purpose and value of the key Big Data and Machine Learning products in the Google Cloud Platform.",
                "Use Cloud SQL and Cloud Dataproc to migrate existing MySQL and Hadoop/Pig/Spark/Hive workloads to Google Cloud Platform",
                "Employ BigQuery and Cloud Datalab to carry out interactive data analysis",
                "Train and use a neural network using TensorFlow",
                "Employ ML APIs",
                "Choose between different data processing products on the Google Cloud Platform",
                "Interact with Google Cloud Platform services"
              ]
            },
            "audience": {
              "description": "This class is intended for the following",
              "summary": "",
              "audienceList": [
                "Data analysts Data scientists Business analysts getting started with Google Cloud Platform",
                "Individuals responsible for designing pipelines and architectures for data processing  creating and maintaining machine learning and statistical models  querying datasets  visualizing query results and creating reports",
                "Executives and IT decision makers evaluating Google Cloud Platform for use by data scientists."
              ]
            }
          },
          "": {
            "prerequisites": {
              "description": "To get the most of out of this course, participants should have",
              "summary": "",
              "PrerequisiteList": [
                "Basic proficiency with common query language such as SQL",
                "Experience with data modeling extract transform and load activities",
                "Developing applications using a common programming language such Python",
                "Familiarity with Machine Learning and/or statistic"
              ]
            },
            "Requirements": "",
            "content": {
              "description": "The course includes presentations, demonstrations, and hands-on labs.",
              "modules": [
                {
                  "name": "Introducing Google Cloud Platform",
                  "summary": "",
                  "moduleItems": [
                    "Google Platform Fundamentals Overview",
                    "Google Cloud Platform Big Data Products."
                  ]
                },
                {
                  "name": "Compute and Storage Fundamentals",
                  "summary": "",
                  "moduleItems": [
                    "CPUs on demand -Compute Engine",
                    "global filesystem - Cloud Storage",
                    "Cloud Shell",
                    "Lab Set up an Ingest-Transform-Publish data processing pipeline."
                  ]
                },
                {
                  "name": "Data Analytics on the Cloud",
                  "summary": "",
                  "moduleItems": [
                    "Stepping-stones to the cloud",
                    "Cloud SQL-your SQL database on the cloud.Lab- Importing data into CloudSQL and running queries",
                    "Spark on Dataproc",
                    "Lab- Machine Learning Recommendations with Spark on Dataproc."
                  ]
                },
                {
                  "name": "Scaling Data Analysis",
                  "summary": "",
                  "moduleItems": [
                    "Fast random access",
                    "Datalab",
                    "BigQuery",
                    "Lab- Build machine learning dataset."
                  ]
                },
                {
                  "name": "Machine Learning",
                  "summary": "",
                  "moduleItems": [
                    "Machine Learning with TensorFlow",
                    "Lab- Carry out ML with TensorFlow",
                    "Pre-built models for common needs",
                    "Lab- Employ ML APIs."
                  ]
                },
                {
                  "name": "Data Processing Architectures",
                  "summary": "",
                  "moduleItems": [
                    "Message-oriented architectures with Pub/Sub",
                    "Creating pipelines with Dataflow",
                    "Reference architecture for real-time and batch data processing."
                  ]
                },
                {
                  "name": "Summary",
                  "summary": "",
                  "moduleItems": [
                    "Why GCP",
                    "Where to go from here",
                    "Additional Resources"
                  ]
                }
              ]
            }
          },
          "learningImpact": "",
          "Recommendation": "",
          "quiz": ""
        }
      };

      debugger;
    const[courseCategory,setCourseCategory] = useState({courseCategoryId : 0,name:""});
    const[courseTechnology,setCourseTechnology] = useState({technologyId : 0,name:""});
    const[coursePartner,setCoursePartner] = useState({partnerId : 0,name:""})
    const[audienceList,setAudienceList] = useState([]);
    const[objectiveList,setObjectiveList] = useState([]);
    const[audience,setAudience] = useState({description :"",summary:"", audienceList : audienceList });
    const[objectives,setObjectives ] = useState({description : "",summary : "",objectiveList : objectiveList});
    const[courseContent,setCourseContent] = useState({description : "",heighlights : "",courseIncluded:[],objectives : objectives,audience:audience});

    const[course,setCourse] = useState({courseId : 0,courseName:"",courseCode:"",courseCategory:courseCategory,courseTechnology:courseTechnology,coursePartner:coursePartner,courseDuration:0,})
    
    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
        console.log(course);
    };

    const handleCourseCategoryChange = (e) => {
        const { name, value } = e.target;
        setCourseCategory(prevCategory => ({ ...prevCategory, [name]: value }));
    };

    const handleCourseTechnologyChange = (e) => {
        const { name, value } = e.target;
        setCourseTechnology(prevTechnology => ({ ...prevTechnology, [name]: value }));
    };

    const handleCoursePartnerChange = (e) => {
        const { name, value } = e.target;
        setCoursePartner(prevPartner => ({ ...prevPartner, [name]: value }));
    };


    const handleAudienceChange  = (e) => {
        setAudience(prev => ({...prev,[e.target.name] : e.target.value}));
    }

    const handleAudienceListChange =  (e) => {
        audienceList.push(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedCourse = course;
        updatedCourse.courseCategory = courseCategory;
        updatedCourse.courseTechnology = courseTechnology;
        updatedCourse.coursePartner = coursePartner;
        console.log(updatedCourse);
    }

    return (
        <div className="container">
            <div className="row p-3">
                <div className="col-md-6">
                    <div className="row">
                        <form onSubmit={e => handleFormSubmit(e)}>
                            <label for="courseId">Course Id:</label>
                            <input type="text" id="courseId" name="courseId" value={course.courseId} onChange={e => handleCourseChange(e)} /><br /><br />

                            <label for="courseName">Course Name:</label>
                            <input type="text" id="courseName" name="courseName" value={course.courseName} onChange={e => handleCourseChange(e)} /><br /><br />

                            <label for="courseCode">Course Code:</label>
                            <input type="text" id="courseCode" name="courseCode" value={course.courseCode} onChange={e => handleCourseChange(e)} /><br /><br />

                            <h5>Course Category</h5>

                            <label for="courseCategory">Course Category Id:</label>
                            <input type="text" id="courseCategoryId" name="courseCategoryId" value={courseCategory.courseCategoryId} onChange={e => handleCourseCategoryChange(e)} /><br /><br />

                            <label for="courseCategory">Name:</label>
                            <input type="text" id="courseCategoryName" name="name" value={courseCategory.name} onChange={e => handleCourseCategoryChange(e)} /><br /><br />

                            <h5>Course technology</h5>

                            <label for="technologyName">Technology Id</label>
                            <input type="text" id="technologyId" name="technologyId" value={courseTechnology.technologyId} onChange={e => handleCourseTechnologyChange(e)} /><br /><br />

                            <label for="technologyName">Technology Name</label>
                            <input type="text" id="technologyName" name="name" value={courseTechnology.name} onChange={e => handleCourseTechnologyChange(e)} /><br /><br />

                            <h5>Course Partner</h5>

                            <label for="partnerId">Partner Id</label> 
                            <input type="text" id="partnerId" name="partnerId" value={coursePartner.partnerId} onChange={e => handleCoursePartnerChange(e)} /><br /><br />

                            <label for="partnerName">Partner Name</label>
                            <input type="text" id="partnerName" name="name" value={coursePartner.name} onChange={e => handleCoursePartnerChange(e)} /><br /><br /><br/>

                            <label for="courseDuration">Course Duration:</label>
                            <input type="number" id="courseDuration" name="courseDuration" value={course.courseDuration} onChange={e => handleCourseChange(e)} /><br /><br />

                            <h5>Course Content</h5>

                            <label for="courseDescription">Description:</label><br />
                            <textarea id="courseDescription" name="courseDescription" rows="4" cols="50"></textarea><br />

                            <label for="courseHighlights">Highlights:</label><br />
                            <textarea id="courseHighlights" name="courseHighlights" rows="4" cols="50"></textarea><br /><br />

                            <label for="objectives">Objectives:</label><br />
                            <textarea id="objectives" name="objectives" rows="4" cols="50"></textarea><br /><br />

                            <label for="audience">Audience:</label><br />
                            <textarea id="audience" name="audience" rows="4" cols="50"></textarea><br /><br />

                            <label for="prerequisites">Prerequisites:</label><br />
                            <textarea id="prerequisites" name="prerequisites" rows="4" cols="50"></textarea><br /><br />

                            <label for="courseRequirements">Requirements:</label><br />
                            <textarea id="courseRequirements" name="courseRequirements" rows="4" cols="50"></textarea><br /><br />

                            <label for="courseContent">Content:</label><br />
                            <textarea id="courseContent" name="courseContent" rows="4" cols="50"></textarea><br /><br />

                            <label for="learningImpact">Learning Impact:</label><br />
                            <textarea id="learningImpact" name="learningImpact" rows="4" cols="50"></textarea><br /><br />

                            <label for="recommendation">Recommendation:</label><br />
                            <textarea id="recommendation" name="recommendation" rows="4" cols="50"></textarea><br /><br />

                            <label for="quiz">Quiz:</label><br />
                            <textarea id="quiz" name="quiz" rows="4" cols="50"></textarea><br /> <br />

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* <pre>{JSON.stringify(json)}</pre> */}
                </div>
            </div>
        </div >
    )
}