import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TeachersList from '@/components/teachers/TeachersList'
import SubjectsList from '@/components/subjects/SubjectsList'
import ClassroomList from '@/components/classrooms/ClassroomList'
import RegisterClassroom from "@/components/classrooms/RegisterClassroom";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/teachers",
      name: "teachers",
      component: TeachersList
    },
    {
      path: "/subjects",
      name: "subjects",
      component: SubjectsList
    },
    {
      path: "/classrooms",
      name: "classrooms",
      component: ClassroomList
    },
    {
      path: "/register-classroom",
      name: "register-classroom",
      component: RegisterClassroom
    }
  ]
});
