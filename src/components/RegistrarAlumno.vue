<template>
  <div class="registrar-alumno">
    <md-layout md-row>
      <md-layout md-gutter md-align="center">
        <md-layout md-flex-xsmall="50" md-flex="70">
          <h2>Registrar Alumno</h2>
        </md-layout>
      </md-layout>
    </md-layout>

    <form @submit="onSubmit">

      <md-layout md-gutter md-align="center" class="pd-t-35 pd-b-35">
        <md-layout md-flex-xsmall="50" md-flex="70">

          <md-card class="card">
            <md-card-header>
              <h3>Datos del alumno(a)</h3>
            </md-card-header>

            <md-card-content>
              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Nombre</label>
                    <md-input v-model="alumno.nombre"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Apellido</label>
                    <md-input v-model="alumno.apellido"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Cédula escolar</label>
                    <md-input v-model="alumno.cedula_escolar"></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>

              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Fecha de nacimiento</label>
                    <md-input type="date" v-model="alumno.f_nacimiento"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Edad</label>
                    <md-input disabled v-model="alumno.edad"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <div>
                    <md-radio v-model="alumno.sexo" name="sexo" md-value="Varón">Varón</md-radio>
                    <md-radio v-model="alumno.sexo" name="sexo" md-value="Hembra">Hembra</md-radio>
                  </div>
                </md-layout>
              </md-layout>

              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Lugar de nacimiento</label>
                    <md-input v-model="alumno.l_nacimiento"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Dirección de habitación</label>
                    <md-input v-model="alumno.habitacion"></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>

            </md-card-content>

            <!-- <md-card-area></md-card-area>

            <md-card-header>
              <h3>Madre</h3>
            </md-card-header>

            <md-card-content>

              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Nombre</label>
                    <md-input v-model="alumno.nombre"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Apellido</label>
                    <md-input v-model="alumno.apellido"></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>

            </md-card-content>

            <md-card-area></md-card-area>

            <md-card-header>
              <h3>Padre</h3>
            </md-card-header>

            <md-card-content>

              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Nombre</label>
                    <md-input v-model="alumno.nombre"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Apellido</label>
                    <md-input v-model="alumno.apellido"></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>

            </md-card-content>

            <md-card-area></md-card-area>

            <md-card-header>
              <h3>Representante</h3>
            </md-card-header>

            <md-card-content>

              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Nombre</label>
                    <md-input v-model="alumno.nombre"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Apellido</label>
                    <md-input v-model="alumno.apellido"></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout>

            </md-card-content>

            <md-card-area></md-card-area>

            <md-card-header>
              <h3>Contacto de emergencia</h3>
            </md-card-header>

            <md-card-content>

              <md-layout md-gutter="24">
                <md-layout>
                  <md-input-container>
                    <label>Nombre</label>
                    <md-input v-model="alumno.nombre"></md-input>
                  </md-input-container>
                </md-layout>

                <md-layout>
                  <md-input-container>
                    <label>Apellido</label>
                    <md-input v-model="alumno.apellido"></md-input>
                  </md-input-container>
                </md-layout>
              </md-layout> -->

            </md-card-content>

            <md-card-actions>
              <md-button type="submit">GUARDAR</md-button>
            </md-card-actions>
          </md-card>

        </md-layout>
      </md-layout>

    </form>

  </div>
</template>

<script>
export default {
  name: 'registrar-alumno',
  data () {
    return {
      alumno: {
        cedula_escolar: '',
        nombre: '',
        apellido: '',
        f_nacimiento: '',
        edad: '',
        sexo: '',
        l_nacimiento: '',
        habitacion: ''
      }
    }
  },
  methods: {
    onSubmit(e) {
      let alumno = {
        cedula_escolar: this.alumno.cedula_escolar,
        nombre: this.alumno.nombre,
        apellido: this.alumno.apellido,
        f_nacimiento: this.alumno.f_nacimiento,
        edad: this.alumno.edad,
        sexo: this.alumno.sexo,
        l_nacimiento: this.alumno.l_nacimiento,
        habitacion: this.alumno.habitacion
      }
      console.log(alumno);
      e.preventDefault();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
