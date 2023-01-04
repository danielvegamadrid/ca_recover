define(["postmonger"], function (Postmonger) {
  "use strict";

  var connection = new Postmonger.Session();
  var authTokens = {};
  var payload = {};
  var schemaPayload = [];
  $(window).ready(onRender);

  connection.on("initActivity", initialize);
  connection.on("requestedTokens", onGetTokens);
  connection.on("requestedEndpoints", onGetEndpoints);
  connection.on("requestedSchema", onGetSchema); // callback response used to map Entry source fields to inArguments
  connection.on("clickedNext", save);
  connection.on("requestedInteraction", requestedInteractionHandler);
  

  function onRender() {
      // JB will respond the first time 'ready' is called with 'initActivity'
      connection.trigger("ready");
      connection.trigger("requestSchema"); // On its callback we populate the global var schemaPayload
      connection.trigger("requestTokens");
      connection.trigger("requestEndpoints");
  }

  //Funcion para inicializar el evento del journey
  let journey = {};
  let event = "";

  function requestedInteractionHandler(interaction) {
      journey = interaction;
      event = journey.triggers[0].metaData.eventDefinitionKey;
  }

  function onGetSchema(getSchemaPayload) {
      console.log("Postmonger - requestedSchema", getSchemaPayload);
      schemaPayload = getSchemaPayload;
  }

  function initialize(data) {
      connection.trigger("requestInteraction");

      if (data) {
          payload = data;
      }

    /*  document.getElementById("event_definition_key").value =
          data["arguments"]["execute"]["inArguments"][0][
              "event_definition_key"
          ]; */
      /*document.getElementById("campana").value =
          data["arguments"]["execute"]["inArguments"][0]["campana"];
          ];*/

      var hasInArguments = Boolean(
          payload["arguments"] &&
              payload["arguments"].execute &&
              payload["arguments"].execute.inArguments &&
              payload["arguments"].execute.inArguments.length > 0
      );

      var inArguments = hasInArguments
          ? payload["arguments"].execute.inArguments
          : {};
      $.each(inArguments, function (index, inArgument) {
          $.each(inArgument, function (key, val) {});
      });

      connection.trigger("updateButton", {
          button: "next",
          text: "done",
          visible: true,
      });
  }

  function onGetTokens(tokens) {
      console.log(tokens);
      authTokens = tokens;
  }

  function onGetEndpoints(endpoints) {
      console.log(endpoints);
  }

  function save() {
    let NodeId = "";
        for (var i = 0; i < schemaPayload.schema.length; i++) {
            var type = schemaPayload.schema[i].key.split(".")[0];
            var name = schemaPayload.schema[i].key.split(".")[2];
            if (type === "Event") {
                if (name == "NodeId") {
                    NodeId = "{{" + schemaPayload.schema[i].key + "}}";
                }
            }
        }
      payload['arguments'].execute.url = "https://ca-recover.vercel.app/journeybuilder/execute";
      payload["arguments"].execute.inArguments = [
          {
              //Event Entry
              event_definition_key: event,
              marketingToolId: "{{Context.DefinitionInstanceId}}",

              //Frontal CA
              crmLeadId: $("#campana").val().split("{{")[0]
                +($("#campana").val().split("{{")[1].empty ? "" : "{{")
                +$("#campana").val().split("{{")[1],
              leadPriority: $("#leadPriority").val().split("{{")[0]
                +($("#leadPriority").val().split("{{")[1].empty ? "" : "{{")
                +$("#leadPriority").val().split("{{")[1],
              leadType: $("#leadType").val().split("{{")[0]
                +($("#leadType").val().split("{{")[1].empty ? "" : "{{")
                +$("#leadType").val().split("{{")[1],
              expirationDate: $("#expirationDate").val().split("{{")[0]
                +($("#expirationDate").val().split("{{")[1].empty ? "" : "{{")
                +$("#expirationDate").val().split("{{")[1],
              state: $("#state").val().split("{{")[0]
                +($("#state").val().split("{{")[1].empty ? "" : "{{")
                +$("#state").val().split("{{")[1],
              comments: $("#comments").val().split("{{")[0]
                +($("#comments").val().split("{{")[1].empty ? "" : "{{")
                +$("#comments").val().split("{{")[1],
              
              //Frontal CA client
              clientNumber: $("#clientNumber").val().split("{{")[0]
                +($("#clientNumber").val().split("{{")[1].empty ? "" : "{{")
                +$("#clientNumber").val().split("{{")[1],
              
              clientName: $("#clientName").val().split("{{")[0]
                +($("#clientName").val().split("{{")[1].empty ? "" : "{{")
                +$("#clientName").val().split("{{")[1],
              
              clientPhone: $("#clientPhone").val().split("{{")[0]
                +($("#clientPhone").val().split("{{")[1].empty ? "" : "{{")
                +$("#clientPhone").val().split("{{")[1],
              
              hasDigitalAccess: $("#hasDigitalAccess").val().split("{{")[0]
                                                    +($("#hasDigitalAccess").val().split("{{")[1].empty ? "" : "{{")
                                                    +$("#hasDigitalAccess").val().split("{{")[1],
              
              clientBirthdate: $("#clientBirthdate").val().split("{{")[0]
                                                        +($("#clientBirthdate").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#clientBirthdate").val().split("{{")[1],
              
              clientEmail: $("#clientEmail").val().split("{{")[0]
                                                        +($("#clientEmail").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#clientEmail").val().split("{{")[1],
              
              //Frontal CA lead
              leadName: $("#leadName").val().split("{{")[0]
                                                        +($("#leadName").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#leadName").val().split("{{")[1],
              
              simulationAmount: $("#simulationAmount").val().split("{{")[0]
                                                        +($("#simulationAmount").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#simulationAmount").val().split("{{")[1],
              
              triad: $("#triad").val().split("{{")[0]
                                                        +($("#triad").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#triad").val().split("{{")[1],
              
              isDomiciledSalary: $("#isDomiciledSalary").val().split("{{")[0]
                                                        +($("#isDomiciledSalary").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#isDomiciledSalary").val().split("{{")[1],
              
              product: $("#product").val().split("{{")[0]
                                                        +($("#product").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#product").val().split("{{")[1],
              
              incidences: $("#incidences").val().split("{{")[0]
                                                        +($("#incidences").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#incidences").val().split("{{")[1],
              
              clientPartenon: $("#clientPartenon").val().split("{{")[0]
                                                        +($("#clientPartenon").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#clientPartenon").val().split("{{")[1],
              
              nbo1: $("#nbo1").val().split("{{")[0]
                                                        +($("#nbo1").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#nbo1").val().split("{{")[1],
              
              nbo2: $("#nbo2").val().split("{{")[0]
                                                        +($("#nbo2").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#nbo2").val().split("{{")[1],
              
              nbo3: $("#nbo3").val().split("{{")[0]
                                                        +($("#nbo3").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#nbo3").val().split("{{")[1],
              
              nbo4: $("#nbo4").val().split("{{")[0]
                                                        +($("#nbo4").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#nbo4").val().split("{{")[1],
              
              nbo5: $("#nbo5").val().split("{{")[0]
                                                        +($("#nbo5").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#nbo5").val().split("{{")[1],
                
              clientBranch: $("#clientBranch").val().split("{{")[0]
                                                        +($("#clientBranch").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#clientBranch").val().split("{{")[1],
              
              clientManager: $("#clientManager").val().split("{{")[0]
                                                        +($("#clientManager").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#clientManager").val().split("{{")[1],
              
              leadCan: $("#operationDate").val().split("{{")[0]
                                                        +($("#operationDate").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#operationDate").val().split("{{")[1],
              
              productFamily: $("#operationDate").val().split("{{")[0]
                                                        +($("#operationDate").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#operationDate").val().split("{{")[1],
              
              operationDate: $("#operationDate").val().split("{{")[0]
                                                        +($("#operationDate").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#operationDate").val().split("{{")[1],
              
              term: $("#term").val().split("{{")[0]
                                                        +($("#term").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#term").val().split("{{")[1],
              
              hasLifeInsurance: $("#hasLifeInsurance").val().split("{{")[0]
                                                        +($("#hasLifeInsurance").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#hasLifeInsurance").val().split("{{")[1],
              
              hasPPInsurance: $("#hasPPInsurance").val().split("{{")[0]
                                                        +($("#hasPPInsurance").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#hasPPInsurance").val().split("{{")[1],
              
              hasAggregatedCharges: $("#hasAggregatedCharges").val().split("{{")[0]
                                                        +($("#hasAggregatedCharges").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#hasAggregatedCharges").val().split("{{")[1],
              
              processId: $("#processId").val().split("{{")[0]
                                                        +($("#processId").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#processId").val().split("{{")[1],
              
              field1: $("#field1").val().split("{{")[0]
                                                        +($("#field1").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field1").val().split("{{")[1],
              field2: $("#field2").val().split("{{")[0]
                                                        +($("#field2").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field2").val().split("{{")[1],
              field3: $("#field3").val().split("{{")[0]
                                                        +($("#field3").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field3").val().split("{{")[1],
              field4: $("#field4").val().split("{{")[0]
                                                        +($("#field4").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field4").val().split("{{")[1],
              field5: $("#field5").val().split("{{")[0]
                                                        +($("#field5").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field5").val().split("{{")[1],              
              field6: $("#field6").val().split("{{")[0]
                                                        +($("#field6").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field6").val().split("{{")[1],
              field7: $("#field7").val().split("{{")[0]
                                                        +($("#field7").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field7").val().split("{{")[1],
              field8: $("#field8").val().split("{{")[0]
                                                        +($("#field8").val().split("{{")[1].empty ? "" : "{{")
                                                        +$("#field8").val().split("{{")[1],
              
              field9: $("#field9").val().split("{{")[0]
                                                    +($("#field9").val().split("{{")[1].empty ? "" : "{{")
                                                    +$("#field9").val().split("{{")[1],
              
              field10: $("#field10").val().split("{{")[0]
                                                +($("#field10").val().split("{{")[1].empty ? "" : "{{")
                                                +$("#field10").val().split("{{")[1],

          },
      ];

      payload["schema"].arguments.execute.inArguments = [
          {
            marketingToolId: {
                  access: "Hidden",
                  dataType: "text",
                  direction: "In",
                  isNullable: false,
                  readOnly: false,
              },
              crmLeadId: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              leadPriority: {
                  access: "Hidden",
                  dataType: "text",
                  direction: "In",
                  isNullable: false,
                  readOnly: false,
              },
              leadType: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              expirationDate: {
                  access: "Hidden",
                  dataType: "text",
                  direction: "In",
                  isNullable: false,
                  readOnly: false,
              },
              state: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              comments: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },


              clientNumber: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              clientName: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              clientPhone: {
                access: "Hidden",
                dataType: "date",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              hasDigitalAccess: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
              },
              clientEmail: {
                  access: "Hidden",
                  dataType: "text",
                  direction: "In",
                  isNullable: false,
                  readOnly: false,
              },
              clientBirthdate: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },   
            
            

              leadName: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            simulationAmount: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            triad: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            isDomiciledSalary: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            product: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            incidences: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },

            clientPartenon: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            nbo1: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            nbo2: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            nbo3: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            nbo4: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            clientBranch: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            clientManager: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            leadCan: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            productFamily: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            operationDate: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            term: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            hasLifeInsurance: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            hasPPInsurance: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            hasAggregatedCharges: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            processId: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field1: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field2: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field3: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field4: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field5: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field6: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field7: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field8: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field9: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
            field10: {
                access: "Hidden",
                dataType: "text",
                direction: "In",
                isNullable: false,
                readOnly: false,
            },
          },
      ];

      payload["metaData"].isConfigured = true;
      connection.trigger("updateActivity", payload);
  }
});
