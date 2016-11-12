'use strict';

SwaggerUi.Models.Oauth2Model = Backbone.Model.extend({
    defaults: {
        scopes: {},
        isPasswordFlow: false
    },

    initialize: function (attributes) {
        this.set('isPasswordFlow', attributes.flow && attributes.flow === 'password');
        this.on('change', this.validate);
    },

    setScopes: function (name, val) {
        var auth = _.extend({}, this.attributes);
        var index = _.findIndex(auth.scopes, function(o) {
            return o.scope === name;
        });
        auth.scopes[index].checked = val;

        this.set(auth);
        this.validate();
    },

    validate: function () {
      var valid = false;
      if (this.get('isPasswordFlow') &&
          (!this.get('username'))) {
          return false;
      }

      var scp = this.get('scopes');
      var idx =  _.findIndex(scp, function (o) {
         return o.checked === true;
      });

      if(scp.length > 0 && idx >= 0) {
          valid = true;
      }

      if(scp.length === 0) {
          valid = true;
      }

      this.set('valid', valid);

      return valid;
    }
});
