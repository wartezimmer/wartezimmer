import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const About = () => {
    const dispatch = useThunkDispatch();
    
    return (
        <>
            <header className="uppercase">
                <LeftOutlined className="back" onClick={() => dispatch(AppApi.back())} />
                <h1>So funktioniert's</h1>
                <div className="space"></div>
            </header>
            <main id="about">
                <section>
                    <h2>Notwendigkeit</h2>
                    <p>
                        Um die Ausbreitung des neuartigen SARS CoV-2-Virus einzudämmen, müssen wir unsere Begegnungen drastisch einschränken.
                    </p>
                    <p>
                        Dabei kann es jedoch gerade in medizinischen Einrichtungen zu verstärkten Ansammlungen von Menschen kommen.
                        Es ist deshalb dringend notwendig, die Abläufe dort zu optimieren und sicherzustellen,
                        dass sich immer nur wenige Patient*innen gleichzeitig dort aufhalten.
                    </p>
                </section>
                <section>
                    <h2>So funktioniert's</h2>
                    <p>
                        Um dieses Ziel zu erreichen, wollen wir mit dieser App deine Wartezeit ins eigene Wohnzimmer verlegen:
                        Die App zeigt dir an, wann es Zeit ist, loszugehen,
                        damit du genau rechtzeitig beim Arzt ankommst und dort unnötige Wartezeiten vermeiden kannst.
                    </p>
                    <p>
                        Dies erreichen wir, indem du angibst, wann du beim Arzt angekommen bist,
                        wann die Behandling beginnt und wie lange diese gedauert hat.
                        So schaffen wir es, übliche Wartezeiten und Auslastungen in den Arztpraxen und Krankenhäusern berechnen
                        und an andere Nutzer*nnen weiterzugeben.
                        Die Folge ist ein optimierter Strom von Patient*innen.
                    </p>
                </section>
                <section>
                    <h2>Entlastung schaffen</h2>
                    <p>
                        Das medizinische Personal wird auf diese Weise ebenfalls unterstützt.
                        Ohne, dass für diese ein administrativer Mehraufwand entsteht,
                        profitieren sie durch den optimierten Strom von Patient*innen.
                    </p>
                    <p>
                        Nutzer*innen der App können ebenfalls sehen, ob es nicht Sinn macht,
                        gerade eine andere Praxis aufzusuchen, die derzeit weniger frequentiert ist.
                        So entsteht eine Verteilung und die medizinische Versorgung wird optimal.
                    </p>
                </section>
                <section>
                    <h2>Was passiert mit den Daten?</h2>
                    <p>
                        All deine Daten werden nur anonymisiert weiterverarbeitet.
                        Wir erheben keine Bewegungsdaten.
                    </p>
                    <p>
                        Als Nutzter brauchst du nichtmal einen Account zu erstellen.
                    </p>
                    <div className="btn-group">
                        <Button
                            type="primary"
                            ghost
                            onClick={() => dispatch(AppApi.back())}
                        >
                            zurück
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => dispatch(AppApi.gotoStep(Step.Search))}
                        >
                            Karte
                        </Button>
                    </div>
                </section>
            </main>
        </>
    );
};
