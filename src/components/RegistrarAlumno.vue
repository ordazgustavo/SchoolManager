<template>
  <div class="registrar-alumno">
    <md-layout md-gutter md-align="center" class="pd-t-35">
      <md-layout md-flex="80">
        <h2>Registrar Alumno</h2>
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
                  <md-input v-model="madre.cedula" @keyup.enter.native="fetchMadre" @keyup.tab.native="fetchMadre" @focusout.native="fetchMadre"></md-input>
                  <md-spinner :md-size="20" :md-stroke="2" md-indeterminate class="md-accent" v-if="madre.status"></md-spinner>
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
                  <md-select name="instruccion" id="instruccion" v-model="madre.instruccion">
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
                  <label>Grados</label>
                  <md-input v-model="madre.grados" :disabled="!madre.otros_alumnos == 1 ? true : false"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>
          </md-step>

          <md-step md-label="Padre" md-button-continue="continuar" md-button-back="volver">
            <md-layout md-gutter="24">
              <md-layout>
                <md-input-container>
                  <label>Cédula</label>
                  <md-input v-model="padre.cedula" @keyup.enter.native="fetchPadre" @keyup.tab.native="fetchPadre" @focusout.native="fetchPadre"></md-input>
                  <md-spinner :md-size="20" :md-stroke="2" md-indeterminate class="md-accent" v-if="madre.status"></md-spinner>
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
                  <md-select name="instruccion" id="instruccion" v-model="padre.instruccion">
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
                  <md-input v-model="representante.cedula" @keyup.enter.native="fetchRepresentante" @keyup.tab.native="fetchRepresentante" @focusout.native="fetchRepresentante"></md-input>
                  <md-spinner :md-size="20" :md-stroke="2" md-indeterminate class="md-accent" v-if="madre.status"></md-spinner>
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
                  <md-input v-model="contacto1.cedula" @keyup.enter.native="fetchContacto1" @keyup.tab.native="fetchContacto1" @focusout.native="fetchContacto1"></md-input>
                  <md-spinner :md-size="20" :md-stroke="2" md-indeterminate class="md-accent" v-if="madre.status"></md-spinner>
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
                  <md-input v-model="contacto2.cedula" @keyup.enter.native="fetchContacto2" @keyup.tab.native="fetchContacto2" @focusout.native="fetchContacto2"></md-input>
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
      alerta: {},

      alumno: {
        cedula_escolar: '22621365',
        nombre: 'Gustavo',
        apellido: 'Ordaz',
        l_nacimiento: 'la asuncion',
        f_nacimiento: '11/08/1994',
        edad: '22',
        sexo: 'Varón',
        procedencia: 'Hogar',
        habitacion: 'Pampatar',
        grado: 'Sala 3',
        seccion: 'B'
      },

      madre: {
        nombre: '',
        apellido: '',
        cedula: '',
        nacionalidad: '',
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
        grados: '',
        status: false
      },

      padre: {
        nombre: '',
        apellido: '',
        cedula: '',
        nacionalidad: '',
        estado_civil: '',
        instruccion: '',
        profesion: '',
        trabaja: '',
        l_trabajo: '',
        d_trabajo: '',
        tlf_trabajo: '',
        tlf_habitacion: '',
        tlf_movil: '',
        status: false
      },

      representante: {
        nombre: '',
        apellido: '',
        cedula: '',
        parentesco: '',
        direccion: '',
        telefono: '',
        status: false
      },

      contacto1: {
        nombre: '',
        apellido: '',
        cedula: '',
        parentesco: '',
        direccion: '',
        telefono: '',
        status: false
      },

      contacto2: {
        nombre: '',
        apellido: '',
        cedula: '',
        parentesco: '',
        direccion: '',
        telefono: '',
        status: false
      }
    }
  },
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },

    closeDialog(ref) {
      this.$refs[ref].close();
    },

    onSubmit() {
      let alumno = {
        cedula_madre: this.madre.cedula,
        cedula_padre: this.padre.cedula,
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

      axios.put('https://bernardoacosta-da3f2.firebaseio.com/alumnos/' + this.alumno.cedula_escolar + '.json', alumno)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      if (this.madre.cedula != '') {
        let madre = {
          nombre: this.madre.nombre,
          apellido: this.madre.apellido,
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
          grados: this.madre.grados
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/madres/' + this.madre.cedula + '.json', madre)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      if (this.padre.cedula != '') {
        let padre = {
          nombre: this.padre.nombre,
          apellido: this.padre.apellido,
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

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/padres/' + this.padre.cedula + '.json', padre)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      if (this.representante.cedula != '') {
        let representante = {
          nombre: this.representante.nombre,
          apellido: this.representante.apellido,
          parentesco: this.representante.parentesco,
          direccion: this.representante.direccion,
          telefono: this.representante.telefono
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/representantes/' + this.representante.cedula + '.json', representante)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        let alRep = {
          representante: this.representante.cedula
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/alumnos_representantes/' + this.alumno.cedula_escolar + '.json', alRep)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }


      if (this.contacto1.cedula != '') {
        let contacto1 = {
          nombre: this.contacto1.nombre,
          apellido: this.contacto1.apellido,
          parentesco: this.contacto1.parentesco,
          direccion: this.contacto1.direccion,
          telefono: this.contacto1.telefono
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/representantes/' + this.contacto1.cedula + '.json', contacto1)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        let alCon1 = {
          contacto1: this.contacto1.cedula
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/alumnos_representantes/' + this.alumno.cedula_escolar + '.json', alCon1)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      if (this.contacto2.cedula != '') {
        let contacto2 = {
          nombre: this.contacto2.nombre,
          apellido: this.contacto2.apellido,
          parentesco: this.contacto2.parentesco,
          direccion: this.contacto2.direccion,
          telefono: this.contacto2.telefono
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/representantes/' + this.contacto2.cedula + '.json', contacto2)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        let alCon2 = {
          contacto2: this.contacto2.cedula
        }

        axios.put('https://bernardoacosta-da3f2.firebaseio.com/alumnos_representantes/' + this.alumno.cedula_escolar + '.json', alCon2)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    fetchMadre() {
      this.madre.status = true;
      let cedula = this.madre.cedula;
      cedula = parseInt(cedula);
      if (cedula >= 1000000) {
        axios.get('https://bernardoacosta-da3f2.firebaseio.com/madres/' + this.madre.cedula + '.json')
          .then(response => {
            this.madre.nombre = response.data.nombre;
            this.madre.apellido = response.data.apellido;
            this.madre.nacionalidad = response.data.nacionalidad;
            this.madre.estado_civil = response.data.estado_civil;
            this.madre.instruccion = response.data.instruccion;
            this.madre.profesion = response.data.profesion;
            this.madre.trabaja = response.data.trabaja;
            this.madre.l_trabajo = response.data.l_trabajo;
            this.madre.d_trabajo = response.data.d_trabajo;
            this.madre.tlf_trabajo = response.data.tlf_trabajo;
            this.madre.tlf_habitacion = response.data.tlf_habitacion;
            this.madre.tlf_movil = response.data.tlf_movil;
            this.madre.otros_alumnos = response.data.otros_alumnos;
            this.madre.cantidad = response.data.cantidad;
            this.madre.grados = response.data.grados;
            this.madre.status = false;
          }).catch(e => {
            this.madre.status = false;
            console.log(e);
          });
      }
    },

    fetchPadre() {
      this.padre.status = true;
      let cedula = this.padre.cedula;
      cedula = parseInt(cedula);
      if (cedula >= 1000000) {
        axios.get('https://bernardoacosta-da3f2.firebaseio.com/padres/' + this.padre.cedula + '.json')
          .then(response => {
            this.padre.nombre = response.data.nombre;
            this.padre.apellido = response.data.apellido;
            this.padre.nacionalidad = response.data.nacionalidad;
            this.padre.estado_civil = response.data.estado_civil;
            this.padre.instruccion = response.data.instruccion;
            this.padre.profesion = response.data.profesion;
            this.padre.trabaja = response.data.trabaja;
            this.padre.l_trabajo = response.data.l_trabajo;
            this.padre.d_trabajo = response.data.d_trabajo;
            this.padre.tlf_trabajo = response.data.tlf_trabajo;
            this.padre.tlf_habitacion = response.data.tlf_habitacion;
            this.padre.tlf_movil = response.data.tlf_movil;
            this.padre.status = false;
          }).catch(e => {
            this.padre.status = false;
            console.log(e);
          });
      }
    },

    fetchRepresentante() {
      this.representante.status = true;
      let cedula = this.representante.cedula;
      cedula = parseInt(cedula);
      if (cedula >= 1000000) {
        axios.get('https://bernardoacosta-da3f2.firebaseio.com/representantes/' + this.representante.cedula + '.json')
          .then(response => {
            this.representante.nombre = response.data.nombre;
            this.representante.apellido = response.data.apellido;
            this.representante.parentesco = response.data.parentesco;
            this.representante.direccion = response.data.direccion;
            this.representante.telefono = response.data.telefono;
            this.representante.status = false;
          }).catch(e => {
            this.representante.status = false;
            console.log(e);
          });
      }
    },

    fetchContacto1() {
      this.contacto1.status = true;
      let cedula = this.contacto1.cedula;
      cedula = parseInt(cedula);
      if (cedula >= 1000000) {
        axios.get('https://bernardoacosta-da3f2.firebaseio.com/representantes/' + this.contacto1.cedula + '.json')
          .then(response => {
            this.contacto1.nombre = response.data.nombre;
            this.contacto1.apellido = response.data.apellido;
            this.contacto1.parentesco = response.data.parentesco;
            this.contacto1.direccion = response.data.direccion;
            this.contacto1.telefono = response.data.telefono;
            this.contacto1.status = false;
          }).catch(e => {
            this.contacto1.status = false;
            console.log(e);
          });
      }
    },

    fetchContacto2() {
      this.contacto2.status = true;
      let cedula = this.contacto2.cedula;
      cedula = parseInt(cedula);
      if (cedula >= 1000000) {
        axios.get('https://bernardoacosta-da3f2.firebaseio.com/representantes/' + this.contacto2.cedula + '.json')
          .then(response => {
            this.contacto2.nombre = response.data.nombre;
            this.contacto2.apellido = response.data.apellido;
            this.contacto2.parentesco = response.data.parentesco;
            this.contacto2.direccion = response.data.direccion;
            this.contacto2.telefono = response.data.telefono;
            this.contacto2.status = false;
          }).catch(e => {
            this.contacto2.status = false;
            console.log(e);
          });
      }
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
