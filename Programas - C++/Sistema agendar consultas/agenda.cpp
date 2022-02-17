//Integrantes: Ana Claudia Pedrosa Rosa, Rick Porto de Melo Silva, Guilherme Augusto Silva Moreira


#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <time.h>

const int MAX_CPF = 12;
const int MAX_NOME = 51;
const int MAX_PACIENTES = 50;
const int MAX_AGENDAMENTOS = 100;
const int MAX_DATA = 9;
const int MAX_HORA = 5;

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
struct Data
{
    int ano;
    int mes;
    int dia;
};
struct Pacientes
{
    long long cpf;
    char nome[MAX_NOME];
    Data data_nasc;
    int idade;
};
struct Consulta
{
    long long cpf;
    Data data_agendamento;
    Hora_agendamento hora_agendada;
};

//Funcao data atual
void data_hora_atual(int &dia, int &mes, int &ano, int &hora, int &min, int &seg)
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

//Valida Tamanho do CPF e se todos os caracteres sao digitos
bool valida_tamCPF(char cpf[])
{
    if(strlen(cpf) != 11)
    {
        return false;
    }
    else if(cpf[0] == '0')
    {
        return false;
    }
    else
    {
        for(int i = 0; i < (strlen(cpf)); i++)
            if (!isdigit(cpf[i]) || cpf[i] == ' ')
                return false;
    }

    return true;
}
//Valida se o CPF já foi cadastrado
bool buscar_cpf(long long cpf, int qtd_pacientes, Pacientes pacientes[])
{
    if(qtd_pacientes == 0)
        return false;

    for(int i = 0; i < qtd_pacientes; i++)
        if(cpf == pacientes[i].cpf)
            return true;

    return false;
}

//Buscar Consulta
bool buscar_consulta(Consulta busca[], int dia, int mes, int ano, int hora, int minuto, int qtd_consultas)
{
    if(qtd_consultas == 0)
        return true;

    for(int i = 0; i < qtd_consultas; i++)
    {
        if(ano == busca[i].data_agendamento.ano)
        {
            if(mes == busca[i].data_agendamento.mes)
            {
                if(dia == busca[i].data_agendamento.dia)
                {
                    if(hora == busca[i].hora_agendada.hora_inicial.hora)
                    {
                        if(minuto < busca[i].hora_agendada.hora_final.minuto)
                            return false;
                    }

                    else if(hora < busca[i].hora_agendada.hora_final.hora && hora > busca[i].hora_agendada.hora_inicial.hora){
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

//Buscar se tem agendamentos futuros
bool buscar_agendamentoFuturo(long long cpf, Consulta busca_agendamento[], int qtd_consultas,
                              int dia_atual, int mes_atual, int ano_atual, int minuto_atual, int hora_atual,
                              int &dia_consulta, int &mes_consulta, int &ano_consulta,
                              int &horainicial_consulta, int &minutoinicial_consulta, int &horafinal_consulta, int &minutofinal_consulta)
{
    for(int i = 0; i < qtd_consultas; i++)
    {
        if(cpf == busca_agendamento[i].cpf)
        {
            if(busca_agendamento[i].data_agendamento.ano > ano_atual)
            {
                dia_consulta = busca_agendamento[i].data_agendamento.dia;
                mes_consulta = busca_agendamento[i].data_agendamento.mes;
                ano_consulta = busca_agendamento[i].data_agendamento.ano;
                horainicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.hora;
                minutoinicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.minuto;
                horafinal_consulta = busca_agendamento[i].hora_agendada.hora_final.hora;
                minutofinal_consulta = busca_agendamento[i].hora_agendada.hora_final.minuto;

                return true;
            }

            else if(busca_agendamento[i].data_agendamento.ano == ano_atual && busca_agendamento[i].data_agendamento.mes > mes_atual)
            {
                dia_consulta = busca_agendamento[i].data_agendamento.dia;
                mes_consulta = busca_agendamento[i].data_agendamento.mes;
                ano_consulta = busca_agendamento[i].data_agendamento.ano;
                horainicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.hora;
                minutoinicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.minuto;
                horafinal_consulta = busca_agendamento[i].hora_agendada.hora_final.hora;
                minutofinal_consulta = busca_agendamento[i].hora_agendada.hora_final.minuto;

                return true;
            }

            else if(busca_agendamento[i].data_agendamento.ano == ano_atual
                    && busca_agendamento[i].data_agendamento.mes == mes_atual
                    && busca_agendamento[i].data_agendamento.dia > dia_atual)
            {
                dia_consulta = busca_agendamento[i].data_agendamento.dia;
                mes_consulta = busca_agendamento[i].data_agendamento.mes;
                ano_consulta = busca_agendamento[i].data_agendamento.ano;
                horainicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.hora;
                minutoinicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.minuto;
                horafinal_consulta = busca_agendamento[i].hora_agendada.hora_final.hora;
                minutofinal_consulta = busca_agendamento[i].hora_agendada.hora_final.minuto;

                return true;
            }

            else if(busca_agendamento[i].data_agendamento.ano == ano_atual
                    && busca_agendamento[i].data_agendamento.mes == mes_atual
                    && busca_agendamento[i].data_agendamento.dia == dia_atual
                    && busca_agendamento[i].hora_agendada.hora_inicial.hora > hora_atual)
            {
                dia_consulta = busca_agendamento[i].data_agendamento.dia;
                mes_consulta = busca_agendamento[i].data_agendamento.mes;
                ano_consulta = busca_agendamento[i].data_agendamento.ano;
                horainicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.hora;
                minutoinicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.minuto;
                horafinal_consulta = busca_agendamento[i].hora_agendada.hora_final.hora;
                minutofinal_consulta = busca_agendamento[i].hora_agendada.hora_final.minuto;

                return true;
            }

            else if(busca_agendamento[i].data_agendamento.ano == ano_atual
                    && busca_agendamento[i].data_agendamento.mes == mes_atual
                    && busca_agendamento[i].data_agendamento.dia == dia_atual
                    && busca_agendamento[i].hora_agendada.hora_inicial.hora == hora_atual
                    && busca_agendamento[i].hora_agendada.hora_inicial.hora > minuto_atual)
            {
                dia_consulta = busca_agendamento[i].data_agendamento.dia;
                mes_consulta = busca_agendamento[i].data_agendamento.mes;
                ano_consulta = busca_agendamento[i].data_agendamento.ano;
                horainicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.hora;
                minutoinicial_consulta = busca_agendamento[i].hora_agendada.hora_inicial.minuto;
                horafinal_consulta = busca_agendamento[i].hora_agendada.hora_final.hora;
                minutofinal_consulta = busca_agendamento[i].hora_agendada.hora_final.minuto;

                return true;
            }
        }
    }

    return false;
}
//Valida nome
bool verifica_nome(char nome[])
{
    if(strlen(nome) < 4)
        return false;

    if(strlen(nome) >= MAX_NOME)
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
//Verifica se a data é numerica
bool verifica_numericaData(char data_nascimento[])
{
    for(int i = 0; i < strlen(data_nascimento); i++)
        if(!isdigit(data_nascimento[i]))
            return false;

    return true;
}
//Verifica o tamanho da data
bool verifica_tamData(char data[], int max_tamanho)
{
    if(strlen(data) == max_tamanho-1)
        return true;

    return false;
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

//Verifica data valida
bool verifica_dataValida(int dia, int mes, int ano)
{
    return ano > 0 &&
           mes >= 1 && mes <= 12 &&
           dia >= 1 && dia <= numero_dias_mes(mes, ano);
}

//Verifica hora valida
bool verifica_horaValida(int hora, int minuto)
{
    if(hora < 8 || hora > 18)
    {
        return false;
    }

    if(minuto < 0 || minuto > 59)
    {
        return false;
    }

    return true;
}

//Verifica data futura
bool verifica_dataFutura(int dia, int mes, int ano,
                         int dia_atual, int mes_atual, int ano_atual)
{
    if(ano < ano_atual)
        return false;
    if(ano == ano_atual && mes < mes_atual)
        return false;
    if(ano == ano_atual && mes == mes_atual && dia < dia_atual)
        return false;

    return true;
}

//Verifica periodo futuro
bool verifica_PeriodoFuturo(int dia, int mes, int ano, int hora, int minuto,
                            int dia_atual, int mes_atual, int ano_atual, int hora_atual, int minuto_atual)
{
    if(ano == ano_atual && mes == mes_atual && dia == dia_atual && hora < hora_atual)
        return false;
    if(ano == ano_atual && mes == mes_atual && dia == dia_atual && hora == hora_atual && minuto <= minuto_atual)
        return false;

    return true;
}

//Verifica minuto
bool verifica_minuto (int minuto)
{
    if(minuto == 0 || minuto == 15 || minuto == 30 || minuto == 45)
        return true;

    return false;
}
//Verifica hora_final > hora_inicial
bool verifica_tempConsulta(int hora_inicial, int hora_final, int minuto_inicial, int minuto_final)
{
    if(hora_inicial > hora_final)
        return false;
    if(hora_inicial == hora_final && minuto_inicial >= minuto_final)
        return false;

    return true;
}

//Calcula idade
int calcula_idade(int ano_nasc, int ano_atual)
{
    int idade = ano_atual - ano_nasc;
    return idade;
}

//Cadastro Paciente
void le_paciente(Pacientes cadastro_paciente[], int &qtd_pacientes, int ano_atual)
{
    //leitura CPF
    char cpf[MAX_CPF];
    do
    {
        printf("CPF: ");
        gets(cpf);

        if(!valida_tamCPF(cpf))
        {
            puts("CPF incorreto!");
        }
    }
    while(!valida_tamCPF(cpf));

    cadastro_paciente[qtd_pacientes].cpf = strtoll(cpf, NULL, 10);

    if(buscar_cpf(cadastro_paciente[qtd_pacientes].cpf, qtd_pacientes, cadastro_paciente))
    {
        puts("Erro: CPF ja cadastrado");
        return;
    }

    //leitura Nome
    do
    {
        printf("Nome: ");
        gets(cadastro_paciente[qtd_pacientes].nome);

        if(!verifica_nome(cadastro_paciente[qtd_pacientes].nome))
        {
            if(strlen(cadastro_paciente[qtd_pacientes].nome) < 4)
                puts("Nome muito pequeno! Digite o nome completo.");
            else if(strlen(cadastro_paciente[qtd_pacientes].nome) >= MAX_NOME)
                puts("Nome muito grande! Abrevie alguns sobrenomes.");
            else
                puts("Nome invalido. Utilize apenas letras.");
        }

    }
    while(!verifica_nome(cadastro_paciente[qtd_pacientes].nome));
    strupr(cadastro_paciente[qtd_pacientes].nome);

    //leitura Data de Nascimento
    do
    {
        char data[MAX_DATA];
        do
        {
            printf("Data de nascimento: ");
            gets(data);

            if(!verifica_tamData(data, MAX_DATA))
                puts("Data inválida. Digite neste formato: DDMMAAAA");
            else if(!verifica_numericaData(data))
                puts("Data inválida. Utilize apenas numeros");

        }
        while(!verifica_tamData(data, MAX_DATA) || !verifica_numericaData(data));

        int dt = atoi(data);
        cadastro_paciente[qtd_pacientes].data_nasc.ano = dt % 10000;
        cadastro_paciente[qtd_pacientes].data_nasc.mes = dt / 10000 % 100;
        cadastro_paciente[qtd_pacientes].data_nasc.dia = dt / 10000 / 100;

        if(!verifica_dataValida(cadastro_paciente[qtd_pacientes].data_nasc.dia, cadastro_paciente[qtd_pacientes].data_nasc.mes, cadastro_paciente[qtd_pacientes].data_nasc.ano))
            puts("Esse nao e um dia valido!");

    }
    while(!verifica_dataValida(cadastro_paciente[qtd_pacientes].data_nasc.dia, cadastro_paciente[qtd_pacientes].data_nasc.mes, cadastro_paciente[qtd_pacientes].data_nasc.ano));

    cadastro_paciente[qtd_pacientes].idade = calcula_idade(cadastro_paciente[qtd_pacientes].data_nasc.ano, ano_atual);

    if(cadastro_paciente[qtd_pacientes].idade < 13)
    {
        printf("Erro: Paciente so tem %d anos\n", cadastro_paciente[qtd_pacientes].idade);
        return;
    }

    qtd_pacientes++;
    puts("Cadastro realizado com sucesso!");
}

//Excluir Pacientes
void excluindo_paciente(Pacientes exclusao_paciente[], Consulta exclusao_consulta[], int &qtd_pacientes, int &qtd_consultas, long long cpf)
{
    Pacientes aux[qtd_pacientes];
    Consulta aux_consulta[qtd_consultas];
    int j = 0;
    //exclusao pacientes
    for(int i = 0; i < qtd_pacientes; i++)
    {
        if(cpf == exclusao_paciente[i].cpf)
            continue;
        else
        {
            aux[j] = exclusao_paciente[i];
            j++;
        }
    }
    qtd_pacientes--;

    for(int i = 0; i < qtd_pacientes; i++)
    {
        exclusao_paciente[i] = aux[i];
    }

    //exclusao consultas
    for(int i = 0; i < qtd_consultas; i++)
    {
        if(cpf == exclusao_consulta[i].cpf)
        {
            qtd_consultas--;
            continue;
        }
        else
        {
            aux_consulta[j] = exclusao_consulta[i];
            j++;
        }
    }

    for(int i = 0; i < qtd_consultas; i++)
    {
        exclusao_consulta[i] = aux_consulta[i];
    }
}
void excluir_paciente(Pacientes exclusao_paciente[], Consulta exclusao_consulta[], int &qtd_paciente, int &qtd_consulta,
                      int dia_atual, int mes_atual, int ano_atual, int minuto_atual, int hora_atual)
{
    long long cpf;

    printf("CPF: ");
    scanf("%lld", &cpf);

    if(!buscar_cpf(cpf, qtd_paciente, exclusao_paciente))
    {
        puts("Erro: paciente não cadastrado");
        return;
    }

    int dia_consulta, mes_consulta, ano_consulta;
    int horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta;

    if(buscar_agendamentoFuturo(cpf, exclusao_consulta, qtd_consulta, dia_atual, mes_atual, ano_atual, minuto_atual, hora_atual,
                                dia_consulta, mes_consulta, ano_consulta,
                                horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta))
    {

        printf("Erro: paciente esta agendado para %d/%d/%d as %d:%dh.\n", dia_consulta, mes_consulta, ano_consulta, horainicial_consulta, minutoinicial_consulta);
        return;
    }

    excluindo_paciente(exclusao_paciente, exclusao_consulta, qtd_paciente, qtd_consulta, cpf);
    puts("Paciente excluido com sucesso!");

}

//Listar Pascientes
void listar_pacientesCPF(Pacientes pacientes_lista[], Consulta consultas_lista[], int qtd_paciente, int qtd_consulta,
                         int dia_atual, int mes_atual, int ano_atual, int minuto_atual, int hora_atual)
{
    Pacientes lista_ordenada[qtd_paciente];
    for(int i = 0; i < qtd_paciente; i++)
        lista_ordenada[i] = pacientes_lista[i];

    bool trocou = true;

    for (int k = qtd_paciente-1; k > 0 && trocou; k--)
    {
        trocou = false;
        for (int i = 0; i < k; i++)
            if (lista_ordenada[i].cpf > lista_ordenada[i+1].cpf)
            {
                Pacientes aux = lista_ordenada[i+1];
                lista_ordenada[i+1] = lista_ordenada[i];
                lista_ordenada[i] = aux;
                trocou = true;
            }
    }

    int dia_consulta, mes_consulta, ano_consulta;
    int horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta;

    puts("-------------------------------------------------------------------------------");
    puts("CPF         Nome                                               Dt.Nasc.   Idade");
    puts("-------------------------------------------------------------------------------");
    for(int i = 0; i < qtd_paciente; i++)
    {
        printf("%lld %-50s %02d/%02d/%02d %5d\n",
               lista_ordenada[i].cpf,
               lista_ordenada[i].nome,
               lista_ordenada[i].data_nasc.dia, lista_ordenada[i].data_nasc.mes, lista_ordenada[i].data_nasc.ano,
               lista_ordenada[i].idade);

        if(buscar_agendamentoFuturo(lista_ordenada[i].cpf, consultas_lista, qtd_consulta, dia_atual, mes_atual, ano_atual, minuto_atual, hora_atual,
                                    dia_consulta, mes_consulta, ano_consulta,
                                    horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta))
        {

            printf("            Agendado para: %02d/%02d/%02d\n            %02d:%02d as %02d:%02d\n",
                   dia_consulta, mes_consulta, ano_consulta,
                   horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta);
        }
    }
    puts("-------------------------------------------------------------------------------");
}

void listar_pacientesNome(Pacientes pacientes_lista[], Consulta consultas_lista[], int qtd_paciente, int qtd_consulta,
                          int dia_atual, int mes_atual, int ano_atual, int minuto_atual, int hora_atual)
{
    Pacientes lista_ordenada[qtd_paciente];
    for(int i = 0; i < qtd_paciente; i++)
        lista_ordenada[i] = pacientes_lista[i];

    bool trocou = true;

    for (int k = qtd_paciente-1; k > 0 && trocou; k--)
    {
        trocou = false;
        for (int i = 0; i < k; i++)
            if (strcmp(lista_ordenada[i].nome, lista_ordenada[i+1].nome) > 0)
            {
                Pacientes aux = lista_ordenada[i+1];
                lista_ordenada[i+1] = lista_ordenada[i];
                lista_ordenada[i] = aux;
                trocou = true;
            }
    }

    int dia_consulta, mes_consulta, ano_consulta;
    int horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta;

    puts("-------------------------------------------------------------------------------");
    puts("CPF         Nome                                               Dt.Nasc.   Idade");
    puts("-------------------------------------------------------------------------------");
    for(int i = 0; i < qtd_paciente; i++)
    {
        printf("%lld %-50s %02d/%02d/%02d %5d\n",
               lista_ordenada[i].cpf,
               lista_ordenada[i].nome,
               lista_ordenada[i].data_nasc.dia, lista_ordenada[i].data_nasc.mes, lista_ordenada[i].data_nasc.ano,
               lista_ordenada[i].idade);

        if(buscar_agendamentoFuturo(lista_ordenada[i].cpf, consultas_lista, qtd_consulta, dia_atual, mes_atual, ano_atual, minuto_atual, hora_atual,
                                    dia_consulta, mes_consulta, ano_consulta,
                                    horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta))
        {

            printf("            Agendado para: %02d/%02d/%d\n            %02d:%02d as %02d:%02d\n",
                   dia_consulta, mes_consulta, ano_consulta,
                   horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta);
        }
    }
    puts("-------------------------------------------------------------------------------");
}

//Agendar Consulta
void agendar_consulta(Consulta agendamentos[], Pacientes dados[], int qtd_pacientes, int &qtd_consultas, int dia_atual, int mes_atual, int ano_atual, int hora_atual, int minuto_atual)
{
    long long cpf;
    int dia_consulta, mes_consulta, ano_consulta, hora_inicial, hora_final, minuto_inicial, minuto_final;

    printf("CPF: ");
    scanf("%lld", &cpf);
    getchar(); //Limpeza

    if(!buscar_cpf(cpf, qtd_pacientes, dados))
    {
        puts("Erro: paciente nao cadastrado");
        return;
    }
    if(buscar_agendamentoFuturo(cpf, agendamentos, qtd_consultas, dia_atual, mes_atual, ano_atual, minuto_atual, hora_atual, dia_consulta, mes_consulta, ano_consulta, hora_inicial, minuto_inicial, hora_final, minuto_final))
    {
        printf("Erro: paciente ja agendado para o dia %02d/%02d/%02d as %02d:%02d\n", dia_consulta, mes_consulta, ano_consulta, hora_inicial, minuto_inicial);
        return;
    }

    //Leitura data da consulta
    char data[MAX_DATA];
    do
    {
        do
        {
            printf("Data da consulta: ");
            gets(data);

            if(!verifica_tamData(data, MAX_DATA))
                puts("Data inválida. Digite neste formato: DDMMAAAA");
            else if(!verifica_numericaData(data))
                puts("Data inválida. Utilize apenas numeros");

        }
        while(!verifica_tamData(data, MAX_DATA) || !verifica_numericaData(data));

        int dt = atoi(data);
        ano_consulta = dt % 10000;
        mes_consulta = dt / 10000 % 100;
        dia_consulta = dt / 10000 / 100;

        if(!verifica_dataValida(dia_consulta, mes_consulta, ano_consulta))
            puts("Esse nao e um dia valido!");
        if(!verifica_dataFutura(dia_consulta, mes_consulta, ano_consulta, dia_atual, mes_atual, ano_atual))
            puts("Digite uma data no futuro.");

    }
    while(!verifica_dataValida(dia_consulta, mes_consulta, ano_consulta) || !verifica_dataFutura(dia_consulta, mes_consulta, ano_consulta, dia_atual, mes_atual, ano_atual));

    //Leitura Hora da consulta
    char hora[MAX_HORA];
    do
    {
        do
        {
            do
            {
                printf("Hora inicial: ");
                gets(hora);

                if(!verifica_tamData(hora, MAX_HORA))
                    puts("Hora inválida. Digite neste formato: HHMM");
                else if(!verifica_numericaData(hora))
                    puts("Hora inválida. Utilize apenas numeros");

            }
            while(!verifica_tamData(hora, MAX_HORA) || !verifica_numericaData(hora));

            int hr = atoi(hora);
            minuto_inicial = hr % 100;
            hora_inicial = hr / 100;

            if(!verifica_horaValida(hora_inicial, minuto_inicial))
                puts("Hora invalida. O agendamento e de 8h ate 19h");

            if(!verifica_PeriodoFuturo(dia_consulta, mes_consulta, ano_consulta, hora_inicial, minuto_inicial, dia_atual, mes_atual, ano_atual, hora_atual, minuto_atual))
                puts("Digite uma hora no futuro.");

            if(!verifica_minuto(minuto_inicial))
            {
                puts("Os agendamentos sao feitos de 15 em 15 minutos!");
            }

        }
        while(!verifica_horaValida(hora_inicial, minuto_inicial)
                || !verifica_PeriodoFuturo(dia_consulta, mes_consulta, ano_consulta, hora_inicial, minuto_inicial, dia_atual, mes_atual, ano_atual, hora_atual, minuto_atual)
                || !verifica_minuto(minuto_inicial));
        do
        {
            do
            {
                printf("Hora final: ");
                gets(hora);

                if(!verifica_tamData(hora, MAX_HORA))
                    puts("Hora invalida. Digite neste formato: HHMM");
                else if(!verifica_numericaData(hora))
                    puts("Hora invalida. Utilize apenas numeros");

            }
            while(!verifica_tamData(hora, MAX_HORA) || !verifica_numericaData(hora));

            int hr = atoi(hora);
            minuto_final = hr % 100;
            hora_final = hr / 100;

            if(!verifica_horaValida(hora_final, minuto_final))
                puts("Hora invalida. O agendamento e de 8h ate 19h");

            if(!verifica_PeriodoFuturo(dia_consulta, mes_consulta, ano_consulta, hora_final,
                                       minuto_final,
                                       dia_atual, mes_atual, ano_atual,
                                       hora_atual, minuto_atual))
                puts("Digite uma hora no futuro.");


        }
        while(!verifica_horaValida(hora_inicial, minuto_inicial)
                || !verifica_PeriodoFuturo(dia_consulta, mes_consulta, ano_consulta, hora_final, minuto_final,
                                           dia_atual, mes_atual, ano_atual, hora_atual, minuto_atual));


        if(!verifica_minuto(minuto_inicial)|| !verifica_minuto(minuto_final))
        {
            puts("Hora Invalida! Os minutos devem ser 00, 15, 30 ou 45");
        }
        if(!verifica_tempConsulta(hora_inicial, hora_final, minuto_inicial, minuto_final))
        {
            puts("Hora Invalida! A hora final deve ser maior que a inicial.");
        }

    }
    while(!verifica_minuto(minuto_inicial) || !verifica_minuto(minuto_final) || !verifica_tempConsulta(hora_inicial, hora_final, minuto_inicial, minuto_final));

    if(!buscar_consulta(agendamentos, dia_consulta, mes_consulta, ano_consulta, hora_inicial, minuto_inicial, qtd_consultas))
    {
        puts("Erro: ja existe uma consulta agendada nessa data/hora");
        return;
    }

    agendamentos[qtd_consultas].cpf = cpf;
    agendamentos[qtd_consultas].data_agendamento.dia = dia_consulta;
    agendamentos[qtd_consultas].data_agendamento.mes = mes_consulta;
    agendamentos[qtd_consultas].data_agendamento.ano = ano_consulta;
    agendamentos[qtd_consultas].hora_agendada.hora_inicial.hora = hora_inicial;
    agendamentos[qtd_consultas].hora_agendada.hora_inicial.minuto = minuto_inicial;
    agendamentos[qtd_consultas].hora_agendada.hora_final.hora = hora_final;
    agendamentos[qtd_consultas].hora_agendada.hora_final.minuto = minuto_final;

    puts("Agendamento realizado com sucesso!");
    qtd_consultas++;
}

//Excluir consulta
void excluindo_consulta(Consulta exclusao_consulta[], int &qtd_consultas, long long cpf, int dia_consulta, int mes_consulta, int ano_consulta,
                        int hora_consulta, int minuto_consulta)
{
    Consulta aux_consulta[qtd_consultas];
    int j = 0;

    //exclusao consultas
    for(int i = 0; i < qtd_consultas; i++)
    {
        if(cpf == exclusao_consulta[i].cpf)
        {
            if(ano_consulta == exclusao_consulta[i].data_agendamento.ano)
            {
                if(mes_consulta == exclusao_consulta[i].data_agendamento.mes)
                {
                    if(dia_consulta == exclusao_consulta[i].data_agendamento.dia)
                    {
                        if(hora_consulta == exclusao_consulta[i].hora_agendada.hora_inicial.hora)
                        {
                            if(minuto_consulta == exclusao_consulta[i].hora_agendada.hora_inicial.minuto)
                            {
                                qtd_consultas--;
                                continue;
                            }
                        }
                    }

                }
            }
        }
        else
        {
            aux_consulta[j] = exclusao_consulta[i];
            j++;
        }
    }

    for(int i = 0; i < qtd_consultas; i++)
    {
        exclusao_consulta[i] = aux_consulta[i];
    }
}
void excluir_consulta(Pacientes cadastro[], Consulta exclusao_consulta[], int qtd_paciente, int &qtd_consulta,
                      int dia_atual, int mes_atual, int ano_atual, int minuto_atual, int hora_atual)
{

    long long cpf;

    printf("CPF: ");
    scanf("%lld", &cpf);
    getchar(); //limpeza

    if(!buscar_cpf(cpf, qtd_paciente, cadastro))
    {
        puts("Erro: paciente nao cadastrado");
        return;
    }

    int dia_consulta, mes_consulta, ano_consulta;
    int horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta;

    if(!buscar_agendamentoFuturo(cpf, exclusao_consulta, qtd_consulta, dia_atual, mes_atual, ano_atual, minuto_atual, hora_atual,
                                 dia_consulta, mes_consulta, ano_consulta,
                                 horainicial_consulta, minutoinicial_consulta, horafinal_consulta, minutofinal_consulta))
    {

        puts("Erro: paciente nao possui agendamentos futuros!");
        return;
    }

    char data[MAX_DATA];
    do
    {
        printf("Data da consulta: ");
        gets(data);

        if(!verifica_tamData(data, MAX_DATA))
            puts("Data inválida. Digite neste formato: DDMMAAAA");
        else if(!verifica_numericaData(data))
            puts("Data inválida. Utilize apenas numeros");

    }
    while(!verifica_tamData(data, MAX_DATA) || !verifica_numericaData(data));

    int dt = atoi(data);
    ano_consulta = dt % 10000;
    mes_consulta = dt / 10000 % 100;
    dia_consulta = dt / 10000 / 100;

    char hora[MAX_HORA];
    do
    {
        printf("Hora inicial: ");
        gets(hora);

        if(!verifica_tamData(hora, MAX_HORA))
            puts("Hora invalida. Digite neste formato: HHMM");
        else if(!verifica_numericaData(hora))
            puts("Hora invalida. Utilize apenas numeros");

    }
    while(!verifica_tamData(hora, MAX_HORA) || !verifica_numericaData(hora));

    int hr = atoi(hora);
    minutoinicial_consulta = hr % 100;
    horainicial_consulta = hr / 100;

    if(buscar_consulta(exclusao_consulta, dia_consulta, mes_consulta, ano_consulta,
                       horainicial_consulta, minutoinicial_consulta, qtd_consulta))
    {
        puts("Erro: agendamento nao encontrado");
        return;
    }

    excluindo_consulta(exclusao_consulta, qtd_consulta, cpf, dia_consulta, mes_consulta, ano_consulta, horainicial_consulta, minutoinicial_consulta);
    puts("Agendamento cancelado com sucesso!");
}
//buscar nome do paciente
Pacientes buscar_nome_paciente(Pacientes dados[], int qtd_pacientes, long long cpf)
{
    Pacientes paciente;
    for(int i = 0; i < qtd_pacientes; i++)
    {
        if(cpf == dados[i].cpf)
        {
            paciente = dados[i];
            return paciente;
        }
    }
}

//ordenar agenda
void ordenar_agenda(Consulta lista_c[], Pacientes lista_p[], int qtd_consultas)
{
    //ordenar datas
    bool trocou = true;

    for (int k = qtd_consultas; k > 0 && trocou; k--)
    {
        trocou = false;
        for (int i = 0; i < k; i++)
        {
            if (lista_c[i].data_agendamento.ano > lista_c[i+1].data_agendamento.ano)
            {
                Consulta aux = lista_c[i+1];
                Pacientes auxiliar = lista_p[i+1];
                lista_c[i+1] = lista_c[i];
                lista_p[i+1] = lista_p[i];
                lista_c[i] = aux;
                lista_p[i] = auxiliar;
                trocou = true;
            }
            else if(lista_c[i].data_agendamento.ano == lista_c[i+1].data_agendamento.ano
                    && lista_c[i].data_agendamento.mes > lista_c[i+1].data_agendamento.mes)
            {
                Consulta aux = lista_c[i+1];
                Pacientes auxiliar = lista_p[i+1];
                lista_c[i+1] = lista_c[i];
                lista_p[i+1] = lista_p[i];
                lista_c[i] = aux;
                lista_p[i] = auxiliar;
                trocou = true;
            }
            else if(lista_c[i].data_agendamento.ano == lista_c[i+1].data_agendamento.ano
                    && lista_c[i].data_agendamento.mes == lista_c[i+1].data_agendamento.mes
                    && lista_c[i].data_agendamento.dia > lista_c[i+1].data_agendamento.dia)
            {
                Consulta aux = lista_c[i+1];
                Pacientes auxiliar = lista_p[i+1];
                lista_c[i+1] = lista_c[i];
                lista_p[i+1] = lista_p[i];
                lista_c[i] = aux;
                lista_p[i] = auxiliar;
                trocou = true;
            }
            else if(lista_c[i].data_agendamento.ano == lista_c[i+1].data_agendamento.ano
                    && lista_c[i].data_agendamento.mes == lista_c[i+1].data_agendamento.mes
                    && lista_c[i].data_agendamento.dia == lista_c[i+1].data_agendamento.dia
                    && lista_c[i].hora_agendada.hora_inicial.hora > lista_c[i+1].hora_agendada.hora_inicial.hora)
            {
                Consulta aux = lista_c[i+1];
                Pacientes auxiliar = lista_p[i+1];
                lista_c[i+1] = lista_c[i];
                lista_p[i+1] = lista_p[i];
                lista_c[i] = aux;
                lista_p[i] = auxiliar;
                trocou = true;
            }
            else if(lista_c[i].data_agendamento.ano == lista_c[i+1].data_agendamento.ano
                    && lista_c[i].data_agendamento.mes == lista_c[i+1].data_agendamento.mes
                    && lista_c[i].data_agendamento.dia == lista_c[i+1].data_agendamento.dia
                    && lista_c[i].hora_agendada.hora_inicial.hora == lista_c[i+1].hora_agendada.hora_inicial.hora
                    && lista_c[i].hora_agendada.hora_inicial.minuto > lista_c[i+1].hora_agendada.hora_inicial.minuto)
            {
                Consulta aux = lista_c[i+1];
                Pacientes auxiliar = lista_p[i+1];
                lista_c[i+1] = lista_c[i];
                lista_p[i+1] = lista_p[i];
                lista_c[i] = aux;
                lista_p[i] = auxiliar;
                trocou = true;
            }
        }
    }

    int tempo_hora[qtd_consultas];
    int tempo_minuto[qtd_consultas];

    for(int i=0; i < qtd_consultas; i++){

        tempo_hora[i] = lista_c[i].hora_agendada.hora_final.hora - lista_c[i].hora_agendada.hora_inicial.hora;
        tempo_minuto[i] = lista_c[i].hora_agendada.hora_final.minuto - lista_c[i].hora_agendada.hora_inicial.minuto;
    }

    puts("------------------------------------------------------------------------------------------");
    puts("   Data    H.Ini H.Fim Tempo Nome                                                Dt.Nasc. ");
    puts("------------------------------------------------------------------------------------------");
    for(int i = 0; i < qtd_consultas; i++)
    {
        printf("%02d/%02d/%02d %02d:%02d %02d:%02d %02d:%02d %-50s %02d/%02d/%02d\n", lista_c[i].data_agendamento.dia,
               lista_c[i].data_agendamento.mes,
               lista_c[i].data_agendamento.ano,
               lista_c[i].hora_agendada.hora_inicial.hora,
               lista_c[i].hora_agendada.hora_inicial.minuto,
               lista_c[i].hora_agendada.hora_final.hora,
               lista_c[i].hora_agendada.hora_final.minuto,
               tempo_hora[i],
               tempo_minuto[i],
               lista_p[i].nome,
               lista_p[i].data_nasc.dia,
               lista_p[i].data_nasc.mes,
               lista_p[i].data_nasc.ano);
    }
    puts("------------------------------------------------------------------------------------------");

}

//opcaop
void listar_agendaP(Consulta lista_consulta[], Pacientes dados[], int qtd_consultas, int qtd_pacientes)
{
    int dia_consulta_inicial, mes_consulta_inicial, ano_consulta_inicial,
        dia_consulta_final, mes_consulta_final, ano_consulta_final;

    char data[MAX_DATA];
    do
    {
        do
        {
            do
            {
                printf("Data Inicial: ");
                gets(data);

                if(!verifica_tamData(data, MAX_DATA))
                    puts("Data inválida. Digite neste formato: DDMMAAAA");
                else if(!verifica_numericaData(data))
                    puts("Data inválida. Utilize apenas numeros");

            }
            while(!verifica_tamData(data, MAX_DATA) || !verifica_numericaData(data));

            int dt = atoi(data);
            ano_consulta_inicial = dt % 10000;
            mes_consulta_inicial = dt / 10000 % 100;
            dia_consulta_inicial = dt / 10000 / 100;

            if(!verifica_dataValida(dia_consulta_inicial, mes_consulta_inicial, ano_consulta_inicial))
                puts("Data invalida");

        }while(!verifica_dataValida(dia_consulta_inicial, mes_consulta_inicial, ano_consulta_inicial));

        do
        {
            do
            {
                printf("Data final: ");
                gets(data);

                if(!verifica_tamData(data, MAX_DATA))
                    puts("Data inválida. Digite neste formato: DDMMAAAA");
                else if(!verifica_numericaData(data))
                    puts("Data inválida. Utilize apenas numeros");

            }
            while(!verifica_tamData(data, MAX_DATA) || !verifica_numericaData(data));

            int dt = atoi(data);
            ano_consulta_final = dt % 10000;
            mes_consulta_final = dt / 10000 % 100;
            dia_consulta_final = dt / 10000 / 100;

            if(!verifica_dataValida(dia_consulta_final, mes_consulta_final, ano_consulta_final))
                puts("Data invalida");

        }
        while(!verifica_dataValida(dia_consulta_final, mes_consulta_final, ano_consulta_final));

        if(ano_consulta_final < ano_consulta_inicial
                || (ano_consulta_final == ano_consulta_inicial && mes_consulta_final < mes_consulta_inicial)
                || (ano_consulta_final == ano_consulta_inicial && mes_consulta_final == mes_consulta_inicial && dia_consulta_final < dia_consulta_inicial)
                || (ano_consulta_final == ano_consulta_inicial && mes_consulta_final == mes_consulta_inicial && dia_consulta_final == dia_consulta_inicial))
            puts("Erro: Data final e menor ou igual a Data inicial!");


    }while(ano_consulta_final < ano_consulta_inicial
            || (ano_consulta_final == ano_consulta_inicial && mes_consulta_final < mes_consulta_inicial)
            || (ano_consulta_final == ano_consulta_inicial && mes_consulta_final == mes_consulta_inicial && dia_consulta_final < dia_consulta_inicial)
            || (ano_consulta_final == ano_consulta_inicial && mes_consulta_final == mes_consulta_inicial && dia_consulta_final == dia_consulta_inicial));


    Consulta periodo[qtd_consultas];
    Pacientes paciente[qtd_consultas];

    int qtd_cons_periodo = 0;

    for(int i = 0; i < qtd_consultas; i++)
    {
        if(ano_consulta_final == ano_consulta_inicial)
        {
            if(lista_consulta[i].data_agendamento.ano == ano_consulta_inicial)
            {
                if(lista_consulta[i].data_agendamento.mes > mes_consulta_inicial
                    && lista_consulta[i].data_agendamento.mes < mes_consulta_final)
                {
                    periodo[qtd_cons_periodo] = lista_consulta[i];
                    paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                    qtd_cons_periodo++;
                }
                else if(mes_consulta_final == mes_consulta_inicial)
                {
                    if(lista_consulta[i].data_agendamento.mes == mes_consulta_inicial)
                    {
                        if(lista_consulta[i].data_agendamento.dia >= dia_consulta_inicial
                                && lista_consulta[i].data_agendamento.dia <= dia_consulta_final)
                        {
                            periodo[qtd_cons_periodo] = lista_consulta[i];
                            paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                            qtd_cons_periodo++;
                        }
                    }
                }
                else if(lista_consulta[i].data_agendamento.mes == mes_consulta_inicial)
                {
                    if(lista_consulta[i].data_agendamento.dia >= dia_consulta_inicial)
                    {
                        periodo[qtd_cons_periodo] = lista_consulta[i];
                        paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                        qtd_cons_periodo++;
                    }
                }
                else if(lista_consulta[i].data_agendamento.mes == mes_consulta_final)
                {
                    if(lista_consulta[i].data_agendamento.dia <= dia_consulta_final)
                    {
                        periodo[qtd_cons_periodo] = lista_consulta[i];
                        paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                        qtd_cons_periodo++;
                    }
                }
            }

        }
        else
        {
            if(lista_consulta[i].data_agendamento.ano > ano_consulta_inicial
                    && lista_consulta[i].data_agendamento.ano < ano_consulta_final)
            {
                periodo[qtd_cons_periodo] = lista_consulta[i];
                paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                qtd_cons_periodo++;
            }
            else if(lista_consulta[i].data_agendamento.ano == ano_consulta_inicial)
            {
                if(lista_consulta[i].data_agendamento.mes == mes_consulta_inicial)
                {
                    if(lista_consulta[i].data_agendamento.dia >= dia_consulta_inicial)
                    {
                        periodo[qtd_cons_periodo] = lista_consulta[i];
                        paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                        qtd_cons_periodo++;
                    }
                }
                else if(lista_consulta[i].data_agendamento.mes > mes_consulta_inicial)
                {
                    periodo[qtd_cons_periodo] = lista_consulta[i];
                    paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                    qtd_cons_periodo++;
                }
            }
            else if(lista_consulta[i].data_agendamento.ano == ano_consulta_final)
            {
                if(lista_consulta[i].data_agendamento.mes == mes_consulta_final)
                {
                    if(lista_consulta[i].data_agendamento.dia <= dia_consulta_final)
                    {
                        periodo[qtd_cons_periodo] = lista_consulta[i];
                        paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                        qtd_cons_periodo++;
                    }
                }
                else if(lista_consulta[i].data_agendamento.mes < mes_consulta_final)
                {
                    periodo[qtd_cons_periodo] = lista_consulta[i];
                    paciente[qtd_cons_periodo] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
                    qtd_cons_periodo++;
                }
            }

        }
    }

    if(qtd_cons_periodo == 0)
    {
        puts("Nao tem consultas marcadas no periodo pedido!");
        return;
    }

    //ordenar datas
    Consulta consulta[qtd_cons_periodo];
    Pacientes paciente_lista[qtd_cons_periodo];

    for(int i = 0; i < qtd_cons_periodo; i++)
    {
        consulta[i] = periodo[i];
        paciente_lista[i] = buscar_nome_paciente(dados, qtd_pacientes, periodo[i].cpf);
    }

    ordenar_agenda(consulta, paciente_lista, qtd_cons_periodo);
}
//opcao t
void listar_agendaT(Consulta lista_consulta[], Pacientes dados[], int qtd_consultas, int qtd_pacientes)
{
    Consulta listando_consulta[MAX_AGENDAMENTOS];
    Pacientes listando_paciente[MAX_AGENDAMENTOS];

    for(int i = 0; i < qtd_consultas; i++)
    {
        listando_consulta[i] = lista_consulta[i];
        listando_paciente[i] = buscar_nome_paciente(dados, qtd_pacientes, lista_consulta[i].cpf);
    }

    ordenar_agenda(listando_consulta, listando_paciente, qtd_consultas);

}
//Listar Agenda
void listar_agenda(Consulta lista_consulta[], Pacientes dados[], int qtd_consultas, int qtd_pacientes)
{
    char opcao;
    do
    {
        printf("Apresentar a agenda T-Toda ou P-Periodo: ");
        scanf("%c", &opcao);
        getchar(); //limpeza

        if((opcao != 'T' && opcao != 't') && (opcao != 'P' && opcao != 'p'))
            puts("Opcao invalida! Digite T ou P");

    }while((opcao != 'T' && opcao != 't') && (opcao != 'P' && opcao != 'p'));

    if(opcao == 'P' || opcao == 'p')
    {
        listar_agendaP(lista_consulta, dados, qtd_consultas, qtd_pacientes);
    }
    else
    {
        listar_agendaT(lista_consulta, dados, qtd_consultas, qtd_pacientes);
    }
}

//Menus
int menuPrincipal()
{
    int opcao;
    puts("Menu Principal");
    puts("1-Cadastro de pacientes");
    puts("2-Agenda");
    puts("3 - Fim");

    scanf("%d", &opcao);
    return opcao;
}
int menuCadastroPaciente()
{
    int opcao;
    puts("Menu do Cadastro de Pacientes");
    puts("1-Cadastrar novo paciente");
    puts("2-Excluir paciente");
    puts("3-Listar pacientes (ordenado por CPF)");
    puts("4-Listar pacientes (ordenado por nome)");
    puts("5-Voltar p/ menu principal");

    scanf("%d", &opcao);
    return opcao;
}
int menuAgenda()
{
    int opcao;
    puts("Agenda");
    puts("1-Agendar consulta");
    puts("2-Cancelar agendamento");
    puts("3-Listar agenda");
    puts("4-Voltar p/ menu principal");

    scanf("%d", &opcao);
    return opcao;
}

int main()
{
    int opcao_menu;
    int qtd_pacientes = 0, qtd_consulta = 0;
    Pacientes dados_paciente[MAX_PACIENTES];
    Consulta agendamentos_paciente[MAX_AGENDAMENTOS];

    //receber data atual
    int dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual;
    data_hora_atual(dia_atual, mes_atual, ano_atual, hora_atual, min_atual, seg_atual);

    do
    {
        opcao_menu = menuPrincipal();
        if(opcao_menu == 1)
        {
            do
            {
                opcao_menu = menuCadastroPaciente();
                getchar();

                if(opcao_menu == 1)
                {
                    if(qtd_pacientes <= MAX_PACIENTES)
                    {
                        le_paciente(dados_paciente, qtd_pacientes, ano_atual);
                    }
                    else
                    {
                        puts("Limite maximo de pacientes cadastrados atingido.");
                    }
                }
                else if(opcao_menu == 2)
                {
                    if(qtd_pacientes > 0)
                    {
                        excluir_paciente(dados_paciente, agendamentos_paciente, qtd_pacientes, qtd_consulta, dia_atual, mes_atual, ano_atual, min_atual, hora_atual);
                    }
                    else
                    {
                        puts("Nao tem pacientes cadastrados ainda.");
                    }
                }
                else if(opcao_menu == 3)
                {
                    if(qtd_pacientes > 0)
                    {
                        listar_pacientesCPF(dados_paciente, agendamentos_paciente, qtd_pacientes, qtd_consulta, dia_atual, mes_atual, ano_atual, min_atual, hora_atual);
                    }
                    else
                    {
                        puts("Nao tem pacientes cadastrados ainda.");
                    }
                }
                else if(opcao_menu == 4)
                {
                    if(qtd_pacientes > 0)
                    {
                        listar_pacientesNome(dados_paciente, agendamentos_paciente, qtd_pacientes, qtd_consulta, dia_atual, mes_atual, ano_atual, min_atual, hora_atual);
                    }
                    else
                    {
                        puts("Nao tem pacientes cadastrados ainda.");
                    }
                }
                else if(opcao_menu != 5)
                {
                    puts("Opcao invalida! Digite um numero de 1 a 5.");
                }
            }
            while(opcao_menu != 5);

        }
        else if(opcao_menu == 2)
        {
            do
            {
                opcao_menu = menuAgenda();
                getchar();

                if(opcao_menu == 1)
                {
                    if(qtd_pacientes == 0)
                    {
                        puts("Nao tem pacientes cadastrados ainda.");
                    }
                    else if(qtd_consulta <= MAX_AGENDAMENTOS)
                    {
                        agendar_consulta(agendamentos_paciente, dados_paciente, qtd_pacientes, qtd_consulta, dia_atual, mes_atual, ano_atual, hora_atual, min_atual);
                    }
                    else
                    {
                        puts("Limite maximo de consultas agendadas atingido.");
                    }
                }
                else if(opcao_menu == 2)
                {
                    if(qtd_consulta == 0)
                    {
                        puts("Nao tem consultas cadastradas ainda.");
                    }
                    else
                    {
                        excluir_consulta(dados_paciente, agendamentos_paciente, qtd_pacientes, qtd_consulta,
                                         dia_atual, mes_atual, ano_atual, min_atual, hora_atual);
                    }
                }
                else if(opcao_menu == 3)
                {
                    listar_agenda(agendamentos_paciente, dados_paciente, qtd_consulta, qtd_pacientes);
                }
                else if(opcao_menu != 4)
                {
                    puts("Opcao invalida! Digite um numero de 1 a 4.");
                }
            }
            while(opcao_menu != 4);
        }
        else if(opcao_menu != 3)
        {
            puts("Opcao invalida! Digite um numero de 1 a 3.");
        }
    }
    while(opcao_menu != 3);
}
