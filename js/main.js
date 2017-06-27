(function($){
   $(function(){

      $(".sidenav-collapse").sideNav({
         menuWidth: 260, // Default is 300
         edge: 'left', // Choose the horizontal origin
         closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
         draggable: true, // Choose whether you can drag to open on touch screens,
         onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
         onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
      });

      $('.datepicker').pickadate({
         selectMonths: true, // Creates a dropdown to control month
         selectYears: 15, // Creates a dropdown of 15 years to control year
         format: 'dd/mm/yyyy',
         formatSubmit: 'yyyy/mm/dd',
         monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
         weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
         today: 'hoy',
         clear: 'limpiar',
      });

      $('select').material_select();

   }); // end of document ready
})(jQuery); // end of jQuery name space
