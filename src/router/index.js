import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '@/components/Inicio'
import RegistrarAlumno from '@/components/RegistrarAlumno'
import Alumnos from '@/components/Alumnos'
import Madres from '@/components/Madres'
import Padres from '@/components/Padres'
import Representantes from '@/components/Representantes'
import Posts from '@/components/Posts'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/alumnos/registrar',
      name: 'RegistrarAlumno',
      component: RegistrarAlumno
    },
    {
      path: '/alumnos',
      name: 'Alumnos',
      component: Alumnos
    },
    {
      path: '/madres',
      name: 'Madres',
      component: Madres
    },
    {
      path: '/padres',
      name: 'Padres',
      component: Padres
    },
    {
      path: '/representantes',
      name: 'Representantes',
      component: Representantes
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})
