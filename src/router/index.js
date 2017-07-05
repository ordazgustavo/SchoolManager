import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import RegistrarAlumno from '@/components/RegistrarAlumno'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
