#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <time.h>

const int MAX_PACIENTES = 50;
const int MAX_AGENDAMENTOS = 100;
const int MAX_NOME = 51;
const int MAX_CPF = 12;

struct Data
{
    int ano;
    int mes;
    int dia;
};

struct Hora
{
    int hora;
    int minuto;
};

struct Hora_agendamento
{
    Hora hora_inicial;
    Hora hora_final;
};


struct Pacientes
{
    char cpf[MAX_CPF];
    char nome[MAX_NOME];
    Data data_nasc;
};

struct Consulta
{
    char cpf[MAX_CPF];
    Data data_agendamento;
    Hora_agendamento hora_agendada;
};

void data_hora_atual(int &dia, int &mes, int &ano,
                     int &hora, int &min, int &seg)
{
    time_t t = time(NULL);
    struct tm lt = *localtime(&t);
    ano = lt.tm_year + 1900;
    mes = lt.tm_mon + 1;
    dia = lt.tm_mday;
    hora = lt.tm_hour;
    min = lt.tm_min;
    seg = lt.tm_sec;
}


bool verifica_cpf(char cpf[])
{
    if(strlen(cpf) != 11)
        return false;

    for(int i = 0; i < (strlen(cpf)); i++)
        if (!isdigit(cpf[i]) || cpf[i] == ' ')
            return false;

    return true;
}

bool verifica_nome(char nome[])
{
    if(strlen(nome) < 4)
        return false;

    for (int i = 0; nome[i] != '\0'; ++i)
    {
        if (!isalpha(nome[0]))
            return false;

        if (!isalpha(nome[i]) && nome[i] != ' ')
            return false;
    }

    return true;
}

bool verifica_data(int dia, int mes, int ano)
{
    if(mes > 12 || mes < 1 || dia < 1)
        return false;

    if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 5)
        if(dia > 31)
            return false;

    return true;
}


bool buscar_cpf(char cpf[], int i, Pacientes pacientes[])
{

    for(int k = 0; k<=i; k++)
        if(strcmp(cpf, pacientes[k].cpf) == 0)
            return true;

    return false;
}

bool verifica_tamData(char data_nascimento[])
{
    if(strlen(data_nascimento)== 8)
        return true;

    return false;
}

bool verifica_numericaData(char data_nascimento[])
{
    for(int i = 0; i < strlen(data_nascimento); i++)
        if(!isdigit(data_nascimento[i]))
            return false;



    return true;
}

bool verifica_anobissexto(int ano)
{
    return (ano % 4 == 0 && ano % 100 != 0) || (ano % 400 == 0);
}

int numero_dias_mes(int mes, int ano)
{
    if (mes < 1|| mes > 12 || ano <= 0)
        return -1;

    if (mes == 1 || mes == 3 || mes == 5 || mes == 7 ||
            mes == 8 || mes == 10 || mes == 12)
        return 31;

    if (mes == 4 || mes == 6 || mes == 9 || mes == 11)
        return 30;

    if (verifica_anobissexto(ano))
        return 29;
    else
        return 28;
}

bool verifica_data_nascimento()
{
    int dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual;
    data_hora_atual(dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual);

    if(ano > ano_atual)
    {
        return false;
    }
    else if(mes > mes_atual && ano == ano_atual)
    {
        return false;
    }
}

bool verfica_dataValida(int dia, int mes, int ano)
{
    return ano > 0 &&
           mes >= 1 && mes <= 12 &&
           dia >= 1 && dia <= numero_dias_mes(mes, ano);
}

bool verifica_idade(int ano)
{
    int dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual;
    data_hora_atual(dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual);

    if(ano + 13 < ano_atual)
    {
        return false;
    }
}

Pacientes le_paciente(int i, Pacientes pacientes[])
{
    Pacientes cadastro_paciente;
    char data_nascimento[9];

    printf("Dados do Paciente \n");

    getchar();
    printf(" CPF: ");
    gets(cadastro_paciente.cpf);

    while(!verifica_cpf(cadastro_paciente.cpf))
    {
        printf(" CPF invalido, digite outro CPF: ");
        gets(cadastro_paciente.cpf);
    };

    while(buscar_cpf(cadastro_paciente.cpf, i, pacientes))
    {
        printf(" CPF ja cadastrado, digite outro CPF: ");
        gets(cadastro_paciente.cpf);
    };

    printf(" nome: ");
    gets(cadastro_paciente.nome);
    strupr(cadastro_paciente.nome);

    while(!verifica_nome(cadastro_paciente.nome))
    {
        printf("Este nao e um nome valido, digite um nome valido: ");
        gets(cadastro_paciente.nome);
    };

    do
    {
        printf("Digite a data do seu nascimento (DDMMAAAA): ");
        gets(data_nascimento);


        while(!verifica_numericaData(data_nascimento) || !verifica_tamData(data_nascimento))
        {
            printf("Este nao e uma data numerica, digite apenas numeros DDMMAAAA: ");
            gets(data_nascimento);
        }

        int dt = atoi(data_nascimento);
        cadastro_paciente.data_nasc.ano = dt % 10000;
        cadastro_paciente.data_nasc.mes = dt / 10000 % 100;
        cadastro_paciente.data_nasc.dia = dt / 10000 / 100;

        if(!verifica_idade(cadastro_paciente.data_nasc.ano))
            printf("O paciente nao possui idade minima \n");

        if(!verfica_dataValida(cadastro_paciente.data_nasc.dia, cadastro_paciente.data_nasc.mes, cadastro_paciente.data_nasc.ano))
            printf("Essa data e invalida \n");

    }
    while(!verfica_dataValida(cadastro_paciente.data_nasc.dia, cadastro_paciente.data_nasc.mes, cadastro_paciente.data_nasc.ano));

    return cadastro_paciente;
}

void excluir_paciente(Pacientes pacientes[], int &i)
{
    char cpf_excluir_paciente[11];

    getchar();
    printf("Digite o cpf do paciente a ser excluido \n");
    gets(cpf_excluir_paciente);

    while(!verifica_cpf(cpf_excluir_paciente))
    {
        printf("Digite o cpf do paciente a ser excluido \n");
        gets(cpf_excluir_paciente);
    }

    for(int k = 0; k < i ; k++ )
    {
        if(strcmp(cpf_excluir_paciente, pacientes[k].cpf) == 0)
        {
            for(int j = k; j < i - 1; j++ )
                pacientes[j] = pacientes[j+1];

            i--;
        }
    }
}

bool verifica_data_agendamento(int ano_agendamento, int dia_agendamento, int mes_agendamento, int dia_atual, int mes_atual, int ano_atual){
        if(ano_agendamento < ano_atual)
            return false;


        if(mes_agendamento < mes_atual)
            return false;

        if(dia_agendamento <= dia_atual)
            return false;

    return true;
}

Consulta agendar_consulta(Consulta consultas[], int qtd_consultas, Pacientes pacientes[])
{
    Consulta cadastro_consulta;
    char data_consulta[9];
    int dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual;
    data_hora_atual(dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual);

    printf("Dados do Paciente \n");

    getchar();
    printf(" CPF: ");
    gets(cadastro_consulta.cpf);

    while(!verifica_cpf(cadastro_consulta.cpf))
    {
        printf(" CPF invalido, digite outro CPF: ");
        gets(cadastro_consulta.cpf);
    };

    while(!buscar_cpf(cadastro_consulta.cpf, qtd_consultas, pacientes))
    {
        printf(" CPF nao cadastrado, digite outro CPF: ");
        gets(cadastro_consulta.cpf);
    };

    do
    {
        printf("Digite a data da consulta (DDMMAAAA): ");
        gets(data_consulta);


        while(!verifica_numericaData(data_consulta) || !verifica_tamData(data_consulta))
        {
            printf("Este nao e uma data numerica, digite apenas numeros DDMMAAAA: ");
            gets(data_consulta);
        }

        int dt = atoi(data_consulta);
        cadastro_consulta.data_agendamento.ano = dt % 10000;
        cadastro_consulta.data_agendamento.mes = dt / 10000 % 100;
        cadastro_consulta.data_agendamento.dia = dt / 10000 / 100;

        printf("%d%d%d %d%d%d \n", cadastro_consulta.data_agendamento.dia, cadastro_consulta.data_agendamento.mes, cadastro_consulta.data_agendamento.ano, dia_atual, mes_atual, ano_atual);



        if(!verfica_dataValida(cadastro_consulta.data_agendamento.dia, cadastro_consulta.data_agendamento.mes, cadastro_consulta.data_agendamento.ano))
            printf("Essa data e invalida \n");

    }
    while(!verfica_dataValida(cadastro_consulta.data_agendamento.dia, cadastro_consulta.data_agendamento.mes, cadastro_consulta.data_agendamento.ano) ||
          !verifica_data_agendamento(cadastro_consulta.data_agendamento.dia, cadastro_consulta.data_agendamento.mes, cadastro_consulta.data_agendamento.ano, dia_atual, mes_atual, ano_atual));


}

int main()
{
    Pacientes cadastro_paciente[MAX_PACIENTES];
    Consulta cadastro_consulta[MAX_AGENDAMENTOS];
    int menu, i = 0, qtd_consulta = 0;

    do
    {
        puts("Menu principal");
        puts("1-Cadastro de pacientes");
        puts("2-Agenda");
        puts("3- Fim");

        scanf("%d", &menu);

        if(menu == 1)
        {
            puts("Menu do Cadastro de Pacientes");
            puts("1-Cadastrar novo pacientes");
            puts("2-Excluir paciente");
            puts("3-Listar pacientes (ordenado por CPF)");
            puts("4-Listar pacientes (ordenado por nome)");
            puts("5-Voltar p/ menu principal");

            scanf("%d", &menu);

            if(menu==1)
            {
                cadastro_paciente[i] = le_paciente(i, cadastro_paciente);
                //printf("%s %s %d %d %d \n", cadastro_paciente[i].nome,cadastro_paciente[i].cpf, cadastro_paciente[i].data_nasc.dia, cadastro_paciente[i].data_nasc.mes, cadastro_paciente[i].data_nasc.ano);
                i++;
            }

            if(menu==2)
            {
                excluir_paciente(cadastro_paciente, i);

                for(int k = 0; k < i; k++)
                    printf("%s \n", cadastro_paciente[k].nome);

            }
        }


        if(menu == 2)
        {
            puts("Agenda");
            puts("1-Agenda consulta");
            puts("2-Cancelar agendamento");
            puts("3-Listar agenda");
            puts("4-Voltar p/ menu principal");

            scanf("%d", &menu);

            if(menu == 1)
            {
                cadastro_consulta[qtd_consulta] = agendar_consulta(cadastro_consulta, qtd_consulta, cadastro_paciente);

                qtd_consulta++;
            }
        }

    }
    while(menu != 3);
}
