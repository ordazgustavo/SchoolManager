<template>
  <div class="registrar-alumno">
    <md-layout md-gutter md-align="center" class="pd-t-35">
      <md-layout md-flex="80">
        <h2>Registrar Alumno</h2>
        <h2 v-if="alert" v-bind:message="alert"></h2>
      </md-layout>
    </md-layout>

    <md-layout md-gutter="24" md-align="center" class="pd-t-35 pd-b-35">
      <md-layout md-flex="80">
        <md-stepper @completed="onSubmit" class="stepper">
          <md-step md-label="Datos del alumno(a)" md-button-continue="continuar" md-button-back="volver">

            <md-layout md-gutter="24">
              <md-layout md-flex-xsmall="100">
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="alumno.nombre"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout md-flex-xsmall="100">
                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="alumno.apellido"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout md-flex-xsmall="100">
                <md-input-container>
                  <label>Fecha de nacimiento</label>
                  <md-input type="date" v-model="alumno.f_nacimiento"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout md-flex-xsmall="100">
                <md-input-container>
                  <label>Edad</label>
                  <md-input disabled v-model="alumno.edad" :value="alumno.f_nacimiento != '' ? calcularEdad : ''"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout md-flex-xsmall="100">
                <div>
                  <md-radio v-model="alumno.sexo" name="sexo" md-value="Varón">Varón</md-radio>
                  <md-radio v-model="alumno.sexo" name="sexo" md-value="Hembra">Hembra</md-radio>
                </div>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout md-flex-xsmall="100" md-flex-small="100">
                <md-input-container>
                  <label>Lugar de nacimiento</label>
                  <md-input v-model="alumno.l_nacimiento"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout md-flex-xsmall="100" md-flex-small="100">
                <md-input-container>
                  <label>Dirección de habitación</label>
                  <md-input v-model="alumno.habitacion"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout md-flex-xsmall="100">
                <md-input-container>
                  <label>Cédula escolar</label>
                  <md-input v-model="alumno.cedula_escolar" :value="(alumno.f_nacimiento != '' && madre.cedula != '') ? cedulaEscolar : ''"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="procedencia">Procedencia</label>
                  <md-select name="procedencia" id="procedencia" v-model="alumno.procedencia">
                    <md-option value="Hogar">Hogar</md-option>
                    <md-option value="Del mismo plantel">Del mismo plantel</md-option>
                    <md-option value="Guardería">Guardería</md-option>
                    <md-option value="De otro preescolar">De otro preescolar</md-option>
                    <md-option value="De una U.E.">De una U.E.</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="grado">Grado a cursar</label>
                  <md-select name="grado" id="grado" v-model="alumno.grado">
                    <md-subheader>Inicial</md-subheader>
                    <md-option value="Sala 3">Sala 3</md-option>
                    <md-option value="Sala 4">Sala 4</md-option>
                    <md-option value="Sala 5">Sala 5</md-option>
                    <md-subheader>Primaria</md-subheader>
                    <md-option value="1">1</md-option>
                    <md-option value="2">2</md-option>
                    <md-option value="3">3</md-option>
                    <md-option value="4">4</md-option>
                    <md-option value="5">5</md-option>
                    <md-option value="6">6</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="seccion">Sección</label>
                  <md-select name="seccion" id="seccion" v-model="alumno.seccion">
                    <md-option value="A">A</md-option>
                    <md-option value="B">B</md-option>
                    <md-option value="C">C</md-option>
                    <md-option value="D">D</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>
            </md-layout>

          </md-step>

          <md-step md-label="Madre" md-button-continue="continuar" md-button-back="volver">
            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Cédula</label>
                  <md-input v-model="madre.cedula"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="madre.nombre"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="madre.apellido"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Nacionalidad</label>
                  <md-input v-model="madre.nacionalidad" value="Venezolana"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="estado_civil">Estado civil</label>
                  <md-select name="estado_civil" id="estado_civil" v-model="madre.estado_civil">
                    <md-option value="Soltera">Soltera</md-option>
                    <md-option value="Concubina">Concubina</md-option>
                    <md-option value="Casada">Casada</md-option>
                    <md-option value="Divorciada">Divorciada</md-option>
                    <md-option value="Viuda">Viuda</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="instruccion">Grado de instrucción</label>
                  <md-select name="instruccion" id="instruccion" v-model="alumno.instruccion">
                    <md-option value="Bachiller">Bachiller</md-option>
                    <md-option value="TSU">TSU</md-option>
                    <md-option value="Licenciado">Licenciado</md-option>
                    <md-option value="Otro">Otro</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Profesión</label>
                  <md-input v-model="madre.profesion"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-checkbox name="trabaja" v-model="madre.trabaja">¿Trabaja?</md-checkbox>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Lugar de trabajo</label>
                  <md-input v-model="madre.l_trabajo" :disabled="!madre.trabaja == 1 ? true : false"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Dirección del trabajo</label>
                  <md-input v-model="madre.d_trabajo" :disabled="!madre.trabaja == 1 ? true : false"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Teléfono del trabajo</label>
                  <md-input v-model="madre.tlf_trabajo"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono de habitación</label>
                  <md-input v-model="madre.tlf_habitacion"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono móvil</label>
                  <md-input v-model="madre.tlf_movil"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-checkbox name="otros_alumnos" v-model="madre.otros_alumnos">Tiene otros alumnos en el plantel?</md-checkbox>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Cantidad</label>
                  <md-input v-model="madre.cantidad" :disabled="!madre.otros_alumnos == 1 ? true : false"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="grados">Grados</label>
                  <md-select name="grados" id="grados" multiple v-model="madre.grados" :disabled="!madre.otros_alumnos == 1 ? true : false">
                    <md-option value="Sala 3">Sala 3</md-option>
                    <md-option value="Sala 4">Sala 4</md-option>
                    <md-option value="Sala 5">Sala 5</md-option>
                    <md-option value="1">1</md-option>
                    <md-option value="2">2</md-option>
                    <md-option value="3">3</md-option>
                    <md-option value="4">4</md-option>
                    <md-option value="5">5</md-option>
                    <md-option value="6">6</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>
            </md-layout>
          </md-step>

          <md-step md-label="Padre" md-button-continue="continuar" md-button-back="volver">
            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Cédula</label>
                  <md-input v-model="padre.cedula"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="padre.nombre"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="padre.apellido"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Nacionalidad</label>
                  <md-input v-model="padre.nacionalidad"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="estado_civil">Estado civil</label>
                  <md-select name="estado_civil" id="estado_civil" v-model="padre.estado_civil">
                    <md-option value="Soltero">Soltero</md-option>
                    <md-option value="Concubino">Concubino</md-option>
                    <md-option value="Casado">Casado</md-option>
                    <md-option value="Divorciado">Divorciado</md-option>
                    <md-option value="Viudo">Viudo</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label for="instruccion">Grado de instrucción</label>
                  <md-select name="instruccion" id="instruccion" v-model="alumno.instruccion">
                    <md-option value="Bachiller">Bachiller</md-option>
                    <md-option value="TSU">TSU</md-option>
                    <md-option value="Licenciado">Licenciado</md-option>
                    <md-option value="Otro">Otro</md-option>
                  </md-select>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Profesión</label>
                  <md-input v-model="padre.profesion"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-checkbox name="trabaja" v-model="padre.trabaja">¿Trabaja?</md-checkbox>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Lugar de trabajo</label>
                  <md-input v-model="padre.l_trabajo" :disabled="!padre.trabaja == 1 ? true : false"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Dirección del trabajo</label>
                  <md-input v-model="padre.d_trabajo" :disabled="!padre.trabaja == 1 ? true : false"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Teléfono del trabajo</label>
                  <md-input v-model="padre.tlf_trabajo"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono de habitación</label>
                  <md-input v-model="padre.tlf_habitacion"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono móvil</label>
                  <md-input v-model="padre.tlf_movil"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>
          </md-step>

          <md-step md-label="Representante" md-button-continue="continuar" md-button-back="volver">
            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Cédula</label>
                  <md-input v-model="representante.cedula"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="representante.nombre"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="representante.apellido"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Parentesco</label>
                  <md-input v-model="representante.parentesco"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Dirección</label>
                  <md-input v-model="representante.direccion"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono</label>
                  <md-input v-model="representante.telefono"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>
          </md-step>

          <md-step md-label="Contacto(s) de emergencia" md-button-continue="guardar" md-button-back="volver">
            <h3>Contacto 1</h3>
            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Cédula</label>
                  <md-input v-model="contacto1.cedula"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="contacto1.nombre"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="contacto1.apellido"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Parentesco</label>
                  <md-input v-model="contacto1.parentesco"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Dirección</label>
                  <md-input v-model="contacto1.direccion"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono</label>
                  <md-input v-model="contacto1.telefono"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <h3>Contacto 2</h3>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Cédula</label>
                  <md-input v-model="contacto2.cedula"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Nombre</label>
                  <md-input v-model="contacto2.nombre"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Apellido</label>
                  <md-input v-model="contacto2.apellido"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>

            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Parentesco</label>
                  <md-input v-model="contacto2.parentesco"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Dirección</label>
                  <md-input v-model="contacto2.direccion"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout>
                <md-input-container>
                  <label>Teléfono</label>
                  <md-input v-model="contacto2.telefono"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>
          </md-step>
        </md-stepper>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'registrar-alumno',
  data () {
    return {
      alert: '',

      alumno: {
        cedula_escolar: '',
        nombre: '',
        apellido: '',
        l_nacimiento: '',
        f_nacimiento: '',
        edad: '',
        sexo: '',
        procedencia: '',
        habitacion: '',
        grado: '',
        seccion: ''
      },

      madre: {
        nombre: '',
        apellido: '',
        cedula: '',
        nacionalidad: 'Venezolana',
        estado_civil: '',
        instruccion: '',
        profesion: '',
        trabaja: '',
        l_trabajo: '',
        d_trabajo: '',
        tlf_trabajo: '',
        tlf_habitacion: '',
        tlf_movil: '',
        otros_alumnos: '',
        cantidad: '',
        grados: ''
      },

      padre: {
        nombre: '',
        apellido: '',
        cedula: '',
        nacionalidad: 'Venezolana',
        estado_civil: '',
        instruccion: '',
        profesion: '',
        trabaja: '',
        l_trabajo: '',
        d_trabajo: '',
        tlf_trabajo: '',
        tlf_habitacion: '',
        tlf_movil: ''
      },

      representante: {
        nombre: '',
        apellido: '',
        cedula: '',
        parentesco: '',
        direccion: '',
        telefono: ''
      },

      contacto1: {
        nombre: '',
        apellido: '',
        cedula: '',
        parentesco: '',
        direccion: '',
        telefono: ''
      },

      contacto2: {
        nombre: '',
        apellido: '',
        cedula: '',
        parentesco: '',
        direccion: '',
        telefono: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let alumno = {
        cedula_escolar: this.alumno.cedula_escolar,
        nombre: this.alumno.nombre,
        apellido: this.alumno.apellido,
        l_nacimiento: this.alumno.l_nacimiento,
        f_nacimiento: this.alumno.f_nacimiento,
        edad: this.alumno.edad,
        sexo: this.alumno.sexo,
        procedencia: this.alumno.procedencia,
        habitacion: this.alumno.habitacion,
        grado: this.alumno.grado,
        seccion: this.alumno.seccion
      }

      axios.post('http://slimapp/api/alumnos/agregar', alumno)
        .then(function (response) {
          console.log(response);
          this.$router.push({path: '/', query: {alert: 'Alumno creado'}});
        })
        .catch(function (error) {
          console.log(error);
        });

      let madre = {
        nombre: this.madre.nombre,
        apellido: this.madre.apellido,
        cedula: this.madre.cedula,
        nacionalidad: this.madre.nacionalidad,
        estado_civil: this.madre.estado_civil,
        instruccion: this.madre.instruccion,
        profesion: this.madre.profesion,
        trabaja: this.madre.trabaja,
        l_trabajo: this.madre.l_trabajo,
        d_trabajo: this.madre.d_trabajo,
        tlf_trabajo: this.madre.tlf_trabajo,
        tlf_habitacion: this.madre.tlf_habitacion,
        tlf_movil: this.madre.tlf_movil,
        otros_alumnos: this.madre.otros_alumnos,
        cantidad: this.madre.cantidad,
        grado: this.madre.grado
      }

      let padre = {
        nombre: this.padre.nombre,
        apellido: this.padre.apellido,
        cedula: this.padre.cedula,
        nacionalidad: this.padre.nacionalidad,
        estado_civil: this.padre.estado_civil,
        instruccion: this.padre.instruccion,
        profesion: this.padre.profesion,
        trabaja: this.padre.trabaja,
        l_trabajo: this.padre.l_trabajo,
        d_trabajo: this.padre.d_trabajo,
        tlf_trabajo: this.padre.tlf_trabajo,
        tlf_habitacion: this.padre.tlf_habitacion,
        tlf_movil: this.padre.tlf_movil
      }

      let representante = {
        nombre: this.representante.nombre,
        apellido: this.representante.apellido,
        cedula: this.representante.cedula,
        parentesco: this.representante.parentesco,
        direccion: this.representante.direccion,
        tlf_movil: this.representante.tlf_movil
      }

      let contacto1 = {
        nombre: this.contacto1.nombre,
        apellido: this.contacto1.apellido,
        cedula: this.contacto1.cedula,
        parentesco: this.contacto1.parentesco,
        direccion: this.contacto1.direccion,
        tlf_movil: this.contacto1.tlf_movil
      }

      let contacto2 = {
        nombre: this.contacto2.nombre,
        apellido: this.contacto2.apellido,
        cedula: this.contacto2.cedula,
        parentesco: this.contacto2.parentesco,
        direccion: this.contacto2.direccion,
        tlf_movil: this.contacto2.tlf_movil
      }
      console.log(alumno);
    },
    fecha() {
      let hoy = new Date();
      let final = hoy.getFullYear().toString().slice(2,4);
      console.log(final);
    }
  },

  computed: {
    calcularEdad: function() {
      let fecha = this.alumno.f_nacimiento;
      let hoy = new Date();
      let cumple = new Date(fecha);
      let edad = hoy.getFullYear() - cumple.getFullYear();
      let m = hoy.getMonth() - cumple.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
          edad--;
      }
      this.alumno.edad = edad;
    },
    cedulaEscolar: function() {
      let f_nacimiento = this.alumno.f_nacimiento;
      let fecha = new Date(f_nacimiento);
      let nacimiento = fecha.getFullYear().toString().slice(2,4);
      let ced = parseInt(this.madre.cedula);
      let cedula = (ced < 10000000) ? '0'+ced.toString() : ced.toString();

      this.alumno.cedula_escolar = '1'+nacimiento+cedula;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
