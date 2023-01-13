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
    connection.on("requestedInteraction", requestedInteractionHandler);
    connection.on(
        'requestedTriggerEventDefinition',
        function (eventDefinitionModel) {
            event = eventDefinitionModel['eventDefinitionKey'];
        }
    );
    connection.on("clickedNext", save);

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
        //console.log("Postmonger - requestedSchema", getSchemaPayload);
        schemaPayload = getSchemaPayload;
    }

    function initialize(data) {
        connection.trigger("requestInteraction");
        console.log(data);
        if (data) {
            payload = data;
        }

        //Frontal CA

        try {
            $('#crmLeadId').val(data["arguments"]["execute"]["inArguments"][0]["crmLeadId"]);
            $('#leadPriority').val(data["arguments"]["execute"]["inArguments"][0]["leadPriority"]);
            $('#leadType').val(data["arguments"]["execute"]["inArguments"][0]["leadType"]);
            $('#expirationDate').val(data["arguments"]["execute"]["inArguments"][0]["expirationDate"]);
            $('#state').val(data["arguments"]["execute"]["inArguments"][0]["state"]);
            $('#comments').val(data["arguments"]["execute"]["inArguments"][0]["comments"]);

            $('#campaignDescription').val(data["arguments"]["execute"]["inArguments"][0]["campaignDescription"]);

            $('#campaingCode').val(data["arguments"]["execute"]["inArguments"][0]["campaingCode"]);
            $('#productFamily').val(data["arguments"]["execute"]["inArguments"][0]["productFamily"]);

            $('#engineLeadExpirationDate').val(data["arguments"]["execute"]["inArguments"][0]["engineLeadExpirationDate"]);

            //Frontal CA client
            $('#clientNumber').val(data["arguments"]["execute"]["inArguments"][0]["clientNumber"]);
            $('#clientName').val(data["arguments"]["execute"]["inArguments"][0]["clientName"]);
            $('#clientPhone').val(data["arguments"]["execute"]["inArguments"][0]["clientPhone"]);
            $('#hasDigitalAccess').val(data["arguments"]["execute"]["inArguments"][0]["hasDigitalAccess"]);
            $('#clientBirthdate').val(data["arguments"]["execute"]["inArguments"][0]["clientBirthdate"]);
            $('#clientEmail').val(data["arguments"]["execute"]["inArguments"][0]["clientEmail"]);

            $('#clientNIF').val(data["arguments"]["execute"]["inArguments"][0]["clientNIF"]);

            //Frontal CA lead
            $('#leadName').val(data["arguments"]["execute"]["inArguments"][0]["leadName"]);
            $('#simulationAmount').val(data["arguments"]["execute"]["inArguments"][0]["simulationAmount"]);
            $('#triad').val(data["arguments"]["execute"]["inArguments"][0]["triad"]);
            $('#isDomiciledSalary').val(data["arguments"]["execute"]["inArguments"][0]["isDomiciledSalary"]);
            $('#product').val(data["arguments"]["execute"]["inArguments"][0]["product"]);
            $('#incidences').val(data["arguments"]["execute"]["inArguments"][0]["incidences"]);

            $('#scoring').val(data["arguments"]["execute"]["inArguments"][0]["scoring"]);
            $('#clientPartenon').val(data["arguments"]["execute"]["inArguments"][0]["clientPartenon"]);

            $('#leadCan').val(data["arguments"]["execute"]["inArguments"][0]["leadCan"]);
            $('#nbo1').val(data["arguments"]["execute"]["inArguments"][0]["nbo1"]);
            $('#nbo2').val(data["arguments"]["execute"]["inArguments"][0]["nbo2"]);
            $('#nbo3').val(data["arguments"]["execute"]["inArguments"][0]["nbo3"]);
            $('#nbo4').val(data["arguments"]["execute"]["inArguments"][0]["nbo4"]);
            $('#nbo5').val(data["arguments"]["execute"]["inArguments"][0]["nbo5"]);
            $('#clientBranch').val(data["arguments"]["execute"]["inArguments"][0]["clientBranch"]);
            $('#clientManager').val(data["arguments"]["execute"]["inArguments"][0]["clientManager"]);
            $('#operationDate').val(data["arguments"]["execute"]["inArguments"][0]["operationDate"]);
            $('#term').val(data["arguments"]["execute"]["inArguments"][0]["term"]);
            $('#hasLifeInsurance').val(data["arguments"]["execute"]["inArguments"][0]["hasLifeInsurance"]);
            $('#hasPPInsurance').val(data["arguments"]["execute"]["inArguments"][0]["hasPPInsurance"]);
            $('#hasAggregatedCharges').val(data["arguments"]["execute"]["inArguments"][0]["hasAggregatedCharges"]);
            $('#processId').val(data["arguments"]["execute"]["inArguments"][0]["processId"]);
            $('#field1').val(data["arguments"]["execute"]["inArguments"][0]["field1"]);
            $('#field2').val(data["arguments"]["execute"]["inArguments"][0]["field2"]);
            $('#field3').val(data["arguments"]["execute"]["inArguments"][0]["field3"]);
            $('#field4').val(data["arguments"]["execute"]["inArguments"][0]["field4"]);
            $('#field5').val(data["arguments"]["execute"]["inArguments"][0]["field5"]);
            $('#field6').val(data["arguments"]["execute"]["inArguments"][0]["field6"]);
            $('#field7').val(data["arguments"]["execute"]["inArguments"][0]["field7"]);
            $('#field8').val(data["arguments"]["execute"]["inArguments"][0]["field8"]);
            $('#field9').val(data["arguments"]["execute"]["inArguments"][0]["field9"]);
            $('#field10').val(data["arguments"]["execute"]["inArguments"][0]["field10"]);

        } catch (error) {
            console.log(error);
        }


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
            $.each(inArgument, function (key, val) { });
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

        payload["arguments"].execute.inArguments = [
            {
                marketingToolId: "{{Context.DefinitionInstanceId}}",
                crmLeadId: $("#crmLeadId").val(),
                leadPriority: $("#leadPriority").val(),
                leadType: $("#leadType").val(),
                expirationDate: $("#expirationDate").val(),
                state: $("#state").val(),
                comments: $("#comments").val(),
                campaignDescription: $('#campaignDescription').val(),
                campaingCode: $("#campaingCode").val(),
                //Frontal CA client
                clientNumber: $("#clientNumber").val(),
                clientName: $("#clientName").val(),
                clientPhone: $("#clientPhone").val(),
                hasDigitalAccess: $("#hasDigitalAccess").val(),
                clientBirthdate: $("#clientBirthdate").val(),
                clientEmail: $("#clientEmail").val(),
                clientNIF: $('#clientNIF').val(),
                leadName: $("#leadName").val(),
                simulationAmount: $("#simulationAmount").val(),
                triad: $("#triad").val(),
                isDomiciledSalary: $("#isDomiciledSalary").val(),
                product: $("#product").val(),
                incidences: $("#incidences").val(),
                scoring: $('#scoring').val(),
                clientPartenon: $("#clientPartenon").val(),
                nbo1: $("#nbo1").val(),
                nbo2: $("#nbo2").val(),
                nbo3: $("#nbo3").val(),
                nbo4: $("#nbo4").val(),
                nbo5: $("#nbo5").val(),
                clientBranch: $("#clientBranch").val(),
                clientManager: $("#clientManager").val(),
                leadCan: $("#leadCan").val(),
                productFamily: $("#productFamily").val(),
                operationDate: $("#operationDate").val(),
                engineLeadExpirationDate: $('#engineLeadExpirationDate').val(),
                term: $("#term").val(),
                hasLifeInsurance: $("#hasLifeInsurance").val(),
                hasPPInsurance: $("#hasPPInsurance").val(),
                hasAggregatedCharges: $("#hasAggregatedCharges").val(),
                processId: $("#processId").val(),
                field1: $("#field1").val(),
                field2: $("#field2").val(),
                field3: $("#field3").val(),
                field4: $("#field4").val(),
                field5: $("#field5").val(),
                field6: $("#field6").val(),
                field7: $("#field7").val(),
                field8: $("#field8").val(),
                field9: $("#field9").val(),
                field10: $("#field10").val(),
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
                campaingCode: {
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
                campaignDescription: {
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
                clientNIF: {
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
                scoring: {
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
                engineLeadExpirationDate: {
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
                }
            },
        ];

        payload["metaData"].isConfigured = true;
        connection.trigger("updateActivity", payload);
    }
});
