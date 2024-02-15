import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { JoyRideCustomBox } from "./components/JoyRideCustomBox";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { showTutorialAtom } from "./recoil/Atoms";
import { isMobile } from "react-device-detect";

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
      disableOverlayClose: true,
    },
    {
      target: "#yearMonthWeek",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Filtre as"
          titleSecoudBold="informações"
          subText="Filtre as informações do painel pelo período de preferência."
        />
      ),
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
          zIndex: 5010,
        },
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
          zIndex: 5010,
        },
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
  ];

  //Mobile Steps
  const mobileSteps = [
    {
      target: "#navBarToggleInsights",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Clique aqui"
          titleSecoudBold=""
          subText=""
        />
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "bottom",
      spotlightClicks: true,
    },
    {
      target: "#yearMonthWeek",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Filtre as"
          titleSecoudBold="informações"
          subText="Filtre as informações do painel pelo período de preferência."
        />
      ),
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
    },
    {
      target: "#menuList",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Clique aqui"
          titleSecoudBold=""
          subText=""
        />
      ),
      styles: {
        options: {
          zIndex: 5010,
        },
      },
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "bottom",
      spotlightClicks: true,
    },
    {
      target: "#ClientesMenu",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Clientes"
          subText="Acesse sua lista de clientes ou leads cadastrados na plataforma!"
        />
      ),
      placement: "right",
      spotlightPadding: 0,
      styles: {
        options: {
          zIndex: 5010,
        },
      },
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
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
      disableOverlayClose: true,
    },
    {
      target: "#menuList",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Clique aqui"
          titleSecoudBold=""
          subText=""
        />
      ),
      styles: {
        options: {
          zIndex: 5010,
        },
      },
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "bottom",
      spotlightClicks: true,
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
      styles: {
        options: {
          zIndex: 5010,
        },
      },
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
    {
      target: "#navBarToggle",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Clique aqui"
          titleSecoudBold=""
          subText=""
        />
      ),
      styles: {
        options: {
          zIndex: 5010,
        },
      },
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
      disableOverlayClose: true,
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
    {
      target: "#menuList",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Clique aqui"
          titleSecoudBold=""
          subText=""
        />
      ),
      styles: {
        options: {
          zIndex: 5010,
        },
      },
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "bottom",
      spotlightClicks: true,
    },
    {
      target: "#ContratosMenu",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Painel de"
          titleSecoudBold="Contratos"
          subText="Solicite a assinatura digital de seus clientes para qualquer tipo de contrato."
        />
      ),
      styles: {
        options: {
          zIndex: 5010,
        },
      },
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
          zIndex: 5010,
        },
      },
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
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
      disableOverlayClose: true,
    },
    {
      target: "#menuList",
      content: (
        <JoyRideCustomBox
          titleFirstBold="Clique aqui"
          titleSecoudBold=""
          subText=""
        />
      ),
      styles: {
        options: {
          zIndex: 5010,
        },
      },
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "bottom",
      spotlightClicks: true,
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
          zIndex: 5010,
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
    <Joyride
      run={getTutorialValue?.run}
      stepIndex={getTutorialValue?.index}
      steps={isMobile ? mobileSteps : steps}
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
      }}
    />
  ) : null;
};
