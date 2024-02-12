import ReactJoyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { JoyRideCustomBox } from "./components/JoyRideCustomBox";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { showTutorialAtom } from "./recoil/Atoms";

export const WalkThrough = () => {
  const [joyHeight, setJoyHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const getTutorialValue = useRecoilValue(showTutorialAtom);
  const [startJoyRide, setStartJoyRide] = useRecoilState(showTutorialAtom);

  useEffect(() => {
    console.log(`getTutorialValue ... ${getTutorialValue?.run}`);
    setJoyHeight(document.body.scrollHeight);
    setIsLoaded(true);
  }, []);

  const steps = [
    {
      target: "#InsightsMenu",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Insights"
          subText="Veja suas métricas filtradas por período e seus clientes mais recentes!"
        />
      ),
      disableBeacon: true,
    },
    {
      target: "#yearMonthWeek",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Documentos"
          titleSecoudBold=""
          subText="Veja o total de documentos já aprovados dos seus clientes."
        />
      ),
    },
    {
      target: "#documentos",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Documentos"
          titleSecoudBold=""
          subText="Veja o total de documentos já aprovados dos seus clientes."
        />
      ),
    },
    {
      target: "#contratos",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Contratos"
          titleSecoudBold=""
          subText="Confira o total de documentos assinados na plataforma."
        />
      ),
    },
    {
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Clientes"
          subText="Acesse sua lista de clientes ou leads cadastrados na plataforma!"
        />
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "bottom",
      spotlightClicks: true,
      target: "#ClientesMenu",
    },
    {
      target: "#newAddClient",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Adicionar"
          titleSecoudBold="Clientes"
          subText="Adicione novos clientes manualmente na plataforma."
        />
      ),
    },
    {
      target: "#DocumentosMenu",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Documentos"
          subText="Gerencie os documentos de todos os seus clientes aprovados!"
        />
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
    {
      target: "#documentTableNavBarButton",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Filtre as"
          titleSecoudBold="informações"
          subText="Filtre seus clientes e documentos de acordo com o status."
        />
      ),
    },
    {
      target: "#documentTable",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Status e"
          titleSecoudBold="Informações"
          subText="Confira os status de documentações dos seus clientes. Clique no nome para ver mais opções."
        />
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
    {
      target: "#generateLinkButton",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Solicitando"
          titleSecoudBold="Documentos"
          subText="Clique em gerar link para solicitar a documentação dos seus clientes."
        />
      ),
      disableOverlayClose: true,
    },
    // {
    //   target: "#requestOtherDocuments",
    //   content: (
    //     <JoyRideCustomBox
    //       titleFirstBold="Seleção de"
    //       titleSecoudBold="documentos"
    //       subText="Selecione os documentos á solicitar, você também pode adicionar qualquer tipo de documento á solicitar."
    //     />
    //   ),
    //   placement: "right",
    //   styles: {
    //     options: {
    //       zIndex: 10000,
    //     },
    //   },
    // },
    // {
    //   target: "#shareLinkInput",
    //   content: (
    //     <JoyRideCustomBox
    //       titleFirstBold="Envio da"
    //       titleSecoudBold="Solicitação"
    //       subText="Compartilhe com o cliente o link para preencher a documentação."
    //     />
    //   ),
    //   styles: {
    //     options: {
    //       zIndex: 10000,
    //     },
    //   },
    // },
    {
      target: "#ContratosMenu",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Contratos"
          subText="Solicite a assinatura digital de seus clientes para qualquer tipo de contrato."
        />
      ),
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
    {
      target: "#newContratoAddButton",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Novo Contrato"
          titleSecoudBold=""
          subText="Clique para iniciar um novo contrato de assinatura digital."
        />
      ),
      //12
    },
    {
      target: "#contractTable",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Workflow de"
          titleSecoudBold="aprovação"
          subText="Revise os contratos assinados para realizar a aprovação ou reprovação dos mesmos."
        />
      ),
      //13
    },
    {
      target: "#profile",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Meu Perfil"
          titleSecoudBold=""
          subText="Gerencie seu perfil, plano e usuários da plataforma."
        />
      ),
      styles: {
        options: {
          zIndex: 50001,
        },
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
      //14
    },

    {
      target: "#generateCodeNewAccountButton",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Adicione novos"
          titleSecoudBold="Usuários"
          subText="Clique no botão para adicionar usuários ou funcionários ao seu sistema"
        />
      ),
    },
    {
      target: "#calculatePlanAndStorage",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Plano e Pacotes"
          titleSecoudBold="Adicionais"
          subText="Clique para gerenciar o seu plano e consumo. Conheça também nossos pacotes adicionais!"
        />
      ),
    },
    {
      target: "#profileImg",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Foto de Perfil"
          titleSecoudBold=""
          subText="Aqui você pode adicionar ou alterar sua foto de perfil"
        />
      ),
    },
    {
      target: "#profileTable",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Histórico de"
          titleSecoudBold="Usuários"
          subText="Veja o histórico de usuários cadastrados na plataforma."
        />
      ),
    },
    {
      target: "#PermissoesMenu",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Permissões"
          subText="Tenha o controle de acesso ou permissões dos usuários criados."
        />
      ),
      styles: {
        options: {
          zIndex: 50001,
        },
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
  ];

  function handleJoyrideCallback(data) {
    const { action, index, type, status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setStartJoyRide({ run: false, index: 0 });
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      console.log("stepIndex ...... ", stepIndex);
      setStartJoyRide({ ...startJoyRide, index: stepIndex });
    } else if (action === "close") {
      setStartJoyRide({ run: false, index: 0 });
    }
  }

  return isLoaded ? (
    <ReactJoyride
      run={getTutorialValue?.run}
      stepIndex={getTutorialValue?.index}
      steps={steps}
      continuous={true}
      callback={handleJoyrideCallback}
      locale={{
        next: "Próximo",
        back: "Voltar",
        last: "Pronto!",
      }}
      styles={{
        options: {
          zIndex: "1",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: joyHeight,
        },
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          backgroundColor: "#0068FF",
          borderRadius: "5px",
        },
        buttonBack: {
          marginRight: 10,
          backgroundColor: "#0068FF",
          color: "#FFFFFF",
          borderRadius: "5px",
        },
        buttonClose: {},
        beaconInner: {
          animation: "joyride-beacon-inner 1.2s infinite ease-in-out",
          backgroundColor: "#0068FF",
          borderRadius: "50%",
          display: "block",
          height: "50%",
          left: "50%",
          opacity: 0.7,
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
        },
        beaconOuter: {
          animation: "joyride-beacon-outer 1.2s infinite ease-in-out",
          backgroundColor: "#0068FF",
          border: `2px solid #0068FF`,
          borderRadius: "50%",
          boxSizing: "border-box",
          display: "block",
          height: "100%",
          left: 0,
          opacity: 0.9,
          position: "absolute",
          top: 0,
          transformOrigin: "center",
          width: "100%",
        },
      }}
    />
  ) : null;
};
