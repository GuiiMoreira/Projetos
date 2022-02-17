#include <stdio.h>

int main()
{
    int n, diaDaSemana, diaDaSemanaMaisUtilizado,
        contadorMedicoA = 0, contadorMedicoB = 0, contadorMedicoC = 0,
        contadorSegunda = 0, contadorTerca = 0, contadorQuarta = 0, contadorQuinta = 0, contadorSexta = 0,
        contadorA1 = 0, contadorA2 = 0, contadorA3 = 0, contadorA4 = 0, contadorA5 = 0,
        contadorB1 = 0, contadorB2 = 0, contadorB3 = 0, contadorB4 = 0, contadorB5 = 0,
        contadorC1 = 0, contadorC2 = 0, contadorC3 = 0, contadorC4 = 0, contadorC5 = 0;
    char medico, medicoMaisConsultado;

    printf("Digite o numero de pacientes participantes da enquete:\n");
    scanf("%d", &n);

    if(n<= 0)
    {
        printf("Digite o numero de pacientes participantes da enquete:\n");
        scanf("%dz", &n);
    }

    for(int i = 0; i<n; i++)
    {
        getchar();
        printf("Qual o medico que este paciente mais consulta? (Responda com 'A', 'B', ou 'C')\n");
        scanf("%c", &medico);

        if(medico != 'A' && medico != 'B' && medico != 'C' )
        {
            getchar();
            printf("Qual o medico que este paciente mais consulta? (Responda com 'A', 'B', ou 'C')\n");
            scanf("%c", &medico);
        };

        printf("Qual o dia da semana que este paciente mais utiliza para marcar consultas? \n (Responda com numero de 1 a 5, onde 1 e Segunda e 5  Sexta)\n");
        scanf("%d", &diaDaSemana);

        if(diaDaSemana<1 || diaDaSemana>5)
        {
            printf("Qual o dia da semana que este paciente mais utiliza para marcar consultas? \n (Responda com numero de 1 a 5, onde 1 e Segunda e 5  Sexta)\n");
            scanf("%d", &diaDaSemana);
        }

        if(medico == 'A')
        {
            contadorMedicoA++;
        };
        if(medico == 'B')
        {
            contadorMedicoB++;
        };
        if(medico == 'C')
        {
            contadorMedicoC++;
        };
        if(diaDaSemana == 1)
        {
            contadorSegunda++;
        };
        if(diaDaSemana == 2)
        {
            contadorTerca++;
        };
        if(diaDaSemana == 3)
        {
            contadorQuarta++;
        };
        if(diaDaSemana == 4)
        {
            contadorQuinta++;
        };
        if(diaDaSemana == 5)
        {
            contadorSexta++;
        };

        if(medico == 'A' && diaDaSemana == 1)
        {
            contadorA1++;
        };

        if(medico == 'A' && diaDaSemana == 2)
        {
            contadorA2++;
        };

        if(medico == 'A' && diaDaSemana == 3)
        {
            contadorA3++;
        };

        if(medico == 'A' && diaDaSemana == 4)
        {
            contadorA4++;
        };

        if(medico == 'A' && diaDaSemana == 5)
        {
            contadorA5++;
        };

        if(medico == 'B' && diaDaSemana == 1)
        {
            contadorB1++;
        };

        if(medico == 'B' && diaDaSemana == 2)
        {
            contadorB2++;
        };

        if(medico == 'B' && diaDaSemana == 3)
        {
            contadorB3++;
        };

        if(medico == 'B' && diaDaSemana == 4)
        {
            contadorB4++;
        };

        if(medico == 'A' && diaDaSemana == 5)
        {
            contadorB5++;
        };

        if(medico == 'C' && diaDaSemana == 1)
        {
            contadorC1++;
        };

        if(medico == 'C' && diaDaSemana == 2)
        {
            contadorC2++;
        };

        if(medico == 'C' && diaDaSemana == 3)
        {
            contadorC3++;
        };

        if(medico == 'C' && diaDaSemana == 4)
        {
            contadorC4++;
        };

        if(medico == 'C' && diaDaSemana == 5)
        {
            contadorC5++;
        };
    };



    if(contadorMedicoA >= contadorMedicoB && contadorMedicoA >= contadorMedicoC)
    {
        printf("O medico mais consultado e o medico A\n");
    };
    if(contadorMedicoB > contadorMedicoA && contadorMedicoB >= contadorMedicoC)
    {
        printf("O medico mais consultado e o medico B\n");
    };
    if(contadorMedicoC > contadorMedicoB && contadorMedicoC > contadorMedicoA)
    {
        printf("O medico mais consultado e o medico C\n");
    };

    if(contadorSegunda >= contadorTerca && contadorSegunda >= contadorQuarta && contadorSegunda >= contadorQuinta && contadorSegunda >= contadorSexta)
    {
        printf("O dia mais utilizado e Segunda\n");
    };

    if(contadorTerca > contadorSegunda && contadorTerca >= contadorQuarta && contadorTerca >= contadorQuinta && contadorTerca >= contadorSexta)
    {
        printf("O dia mais utilizado e Terca\n");
    };

    if(contadorQuarta > contadorTerca && contadorQuarta > contadorSegunda && contadorQuarta >= contadorQuinta && contadorQuarta >= contadorSexta)
    {
        printf("O dia mais utilizado e Quarta\n");
    };

    if(contadorQuinta > contadorTerca && contadorQuinta > contadorQuarta && contadorQuinta > contadorSegunda && contadorQuinta >= contadorSexta)
    {
        printf("O dia mais utilizado e Quinta\n");
    };

    if(contadorSexta > contadorTerca && contadorSexta > contadorQuarta && contadorSexta > contadorQuinta && contadorSexta > contadorSegunda)
    {
        printf("O dia mais utilizado e Sexta\n");
    };

    if(contadorA1 >= contadorA2 && contadorA1 >= contadorA3 && contadorA1 >= contadorA4 && contadorA1 >= contadorA5 && contadorA1 >= contadorB1 && contadorA1 >= contadorB2 && contadorA1 >= contadorB3 && contadorA1 >= contadorB4 && contadorA1 >= contadorB5 && contadorA1 >= contadorC1 && contadorA1 >= contadorC2 &&contadorA1 >= contadorC3 && contadorA1 >= contadorC4 && contadorA1 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico A e Segunda-Feira\n");
    };

    if(contadorA2 > contadorA1 && contadorA2 >= contadorA3 && contadorA2 >= contadorA4 && contadorA2 >= contadorA5 && contadorA2 >= contadorB1 && contadorA2 >= contadorB2 && contadorA2 >= contadorB3 && contadorA2 >= contadorB4 && contadorA2 >= contadorB5 && contadorA2 >= contadorC1 && contadorA2 >= contadorC2 &&contadorA2 >= contadorC3 && contadorA2 >= contadorC4 && contadorA2 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico A e Terca-Feira\n");
    };

    if(contadorA3 > contadorA1 && contadorA3 > contadorA2 && contadorA3 >= contadorA4 && contadorA3 >= contadorA5 && contadorA3 >= contadorB1 && contadorA3 >= contadorB2 && contadorA3 >= contadorB3 && contadorA3 >= contadorB4 && contadorA3 >= contadorB5 && contadorA3 >= contadorC1 && contadorA3 >= contadorC2 &&contadorA3 >= contadorC3 && contadorA3 >= contadorC4 && contadorA3 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico A e Quarta-Feira\n");
    };

    if(contadorA4 > contadorA1 && contadorA4 > contadorA2 && contadorA4 > contadorA3 && contadorA4 >= contadorA5 && contadorA4 >= contadorB1 && contadorA4 >= contadorB2 && contadorA4 >= contadorB3 && contadorA4 >= contadorB4 && contadorA4 >= contadorB5 && contadorA4 >= contadorC1 && contadorA4 >= contadorC2 && contadorA4 >= contadorC3 && contadorA4 >= contadorC4 && contadorA4 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico A e Quinta-Feira\n");
    };

    if(contadorA5 > contadorA1 && contadorA5 > contadorA2 && contadorA5 > contadorA3 && contadorA5 > contadorA4 && contadorA5 >= contadorB1 && contadorA5 >= contadorB2 && contadorA5 >= contadorB3 && contadorA5 >= contadorB4 && contadorA5 >= contadorB5 && contadorA5 >= contadorC1 && contadorA5 >= contadorC2 && contadorA5 >= contadorC3 && contadorA5 >= contadorC4 && contadorA5 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico A e Sexta-Feira\n");
    };

    if(contadorB1 > contadorA1 && contadorB1 > contadorA2 && contadorB1 > contadorA3 && contadorB1 > contadorA4 && contadorB1 > contadorA5 && contadorB1 >= contadorB2 && contadorB1 >= contadorB3 && contadorB1 >= contadorB4 && contadorB1 >= contadorB5 && contadorB1 >= contadorC1 && contadorB1 >= contadorC2 && contadorB1 >= contadorC3 && contadorB1 >= contadorC4 && contadorB1 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico B e Segunda-Feira\n");
    };

    if(contadorB2 > contadorA1 && contadorB2 > contadorA2 && contadorB2 > contadorA3 && contadorB2 > contadorA4 && contadorB2 > contadorA5 && contadorB2 > contadorB1 && contadorB2 >= contadorB3 && contadorB2 >= contadorB4 && contadorB2 >= contadorB5 && contadorB2 >= contadorC1 && contadorB2 >= contadorC2 && contadorB2 >= contadorC3 && contadorB2 >= contadorC4 && contadorB2 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico B e Terca-Feira\n");
    };

    if(contadorB3 > contadorA1 && contadorB3 > contadorA2 && contadorB3 > contadorA3 && contadorB3 > contadorA4 && contadorB3 > contadorA5 && contadorB3 > contadorB1 && contadorB3 > contadorB2 && contadorB3 >= contadorB4 && contadorB3 >= contadorB5 && contadorB3 >= contadorC1 && contadorB3 >= contadorC2 && contadorB3 >= contadorC3 && contadorB3 >= contadorC4 && contadorB3 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico B e Quarta-Feira\n");
    };

    if(contadorB4 > contadorA1 && contadorB4 > contadorA2 && contadorB4 > contadorA3 && contadorB4 > contadorA4 && contadorB4 > contadorA5 && contadorB4 > contadorB1 && contadorB4 > contadorB2 && contadorB4 > contadorB3 && contadorB4 >= contadorB5 && contadorB4 >= contadorC1 && contadorB4 >= contadorC2 &&contadorB4 >= contadorC3 && contadorB4 >= contadorC4 && contadorB4 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico B e Quinta-Feira\n");
    };
    if(contadorB5 > contadorA1 && contadorB5 > contadorA2 && contadorB5 > contadorA3 && contadorB5 > contadorA4 && contadorB5 > contadorA5 && contadorB5 > contadorB1 && contadorB5 > contadorB2 && contadorB5 > contadorB3 && contadorB5 > contadorB4 && contadorB5 >= contadorC1 && contadorB5 >= contadorC2 &&contadorB5 >= contadorC3 && contadorB5 >= contadorC4 && contadorB5 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico B e Sexta-Feira\n");
    };
    if(contadorC1 > contadorA1 && contadorC1 > contadorA2 && contadorC1 > contadorA3 && contadorC1 > contadorA4 && contadorC1 > contadorA5 && contadorC1 > contadorB1 && contadorC1 > contadorB2 && contadorC1 > contadorB3 && contadorC1 > contadorB4 && contadorC1 > contadorB5 && contadorC1 >= contadorC2 &&contadorC1 >= contadorC3 && contadorC1 >= contadorC4 && contadorC1 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico C e Segunda-Feira\n");
    };
    if(contadorC2 > contadorA1 && contadorC2 > contadorA2 && contadorC2 > contadorA3 && contadorC2 > contadorA4 && contadorC2 > contadorA5 && contadorC2 > contadorB1 && contadorC2 > contadorB2 && contadorC2 > contadorB3 && contadorC2 > contadorB4 && contadorC2 > contadorB5 && contadorC2 > contadorC1 && contadorC2 >= contadorC3 && contadorC2 >= contadorC4 && contadorC2 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico C e Terca-Feira\n");
    };
    if(contadorC3 > contadorA1 && contadorC3 > contadorA2 && contadorC3 > contadorA3 && contadorC3 > contadorA4 && contadorC3 > contadorA5 && contadorC3 > contadorB1 && contadorC3 > contadorB2 && contadorC3 > contadorB3 && contadorC3 > contadorB4 && contadorC3 > contadorB5 && contadorC3 > contadorC1 && contadorC3 > contadorC2 && contadorC3 >= contadorC4 && contadorC3 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico C e Quarta-Feira\n");
    };
    if(contadorC4 > contadorA1 && contadorC4 > contadorA2 && contadorC4 > contadorA3 && contadorC4 > contadorA4 && contadorC4 > contadorA5 && contadorC4 > contadorB1 && contadorC4 > contadorB2 && contadorC4 > contadorB3 && contadorC4 > contadorB4 && contadorC4 > contadorB5 && contadorC4 > contadorC1 && contadorC4 > contadorC2 && contadorC4 > contadorC3 && contadorC4 >= contadorC5)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico C e Quinta-Feira\n");
    };
    if(contadorC5 > contadorA1 && contadorC5 > contadorA2 && contadorC5 > contadorA3 && contadorC5 > contadorA4 && contadorC5 > contadorA5 && contadorC5 > contadorB1 && contadorC5 > contadorB2 && contadorC5 > contadorB3 && contadorC5 > contadorB4 && contadorC5 > contadorB5 && contadorC5 > contadorC1 && contadorC5 > contadorC2 && contadorC5 > contadorC3 && contadorC5 > contadorC4)
    {
        printf("A combinacao medico e dia da semana mais frequentado e medico C e Sexta-Feira\n");
    };
}

