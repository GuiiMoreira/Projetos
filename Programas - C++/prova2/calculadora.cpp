#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main()
{
    char expressao[100];
    char aux[100];
    char  operador;
    float num1, num3;
    int num2, tamanho;

    printf("Digite a expressao: ");
    gets(expressao);

    int j = 0;
    tamanho = strlen(expressao);

    for(int i = 0; i<tamanho; i++)
    {
        if(expressao[i] != ' ')
        {
            aux[j] = expressao[i];
            j++;
        }
    }
    aux[j] = '\0';
    num1 = aux[0] - 48;

    if(strlen(aux)%2 == 0)
    {
        return printf("Expressao invalida!");
    }
    for(int i = 1; i < strlen(aux); i++)
    {
        if(i%2 == 1)
        {
            operador = aux[i];
            if(operador != '+' && operador != '-' && operador != '*' && operador != '/' && operador != '^')
                return printf("Expressao invalida!");
        }
        if(i%2 == 0)
        {
            if(!isdigit(aux[i]))
                return printf("Expressao invalida!");
            num2 = aux[i] - 48;

            if(operador == '+')
                num1 += num2;

            if(operador == '-')
                num1 -= num2;

            if(operador == '*')
                num1 *= num2;

            if(operador == '/')
                num1 /= num2;

            if(operador == '^')
            {
                if(num2 == 0)
                    num1 = 1;

                if(num2 == 2)
                    num1 *= num1;

                if(num2 > 2)
                {
                    num3 = num1*num1;

                    for(int i = 0; i<num2-2; i++)
                    {
                        num3 *= num1 ;
                    }

                    num1 = num3;
                }
            }
        }
    }

    printf("Resultado: %f", num1);

}
