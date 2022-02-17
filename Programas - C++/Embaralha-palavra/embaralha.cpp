#include<stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <time.h>

bool verifica_palavra(char palavra[])
{
    int tamanhoDaPalavra;
    tamanhoDaPalavra = strlen(palavra);

    if(tamanhoDaPalavra < 5 || tamanhoDaPalavra > 50)
        return false;

    for (int i = 0; i < tamanhoDaPalavra; i++)
        if (!isalpha(palavra[i]))
            return false;

    return true;
}

void embaralha(char palavra[])
{
    char palavraEmbaralhada[50];
    int tamanho;

    tamanho = strlen(palavra);

    int lista[tamanho], k=0, contador, num;

    do
    {
        lista[k] = rand() % tamanho;
        contador = 0;

        for(int j=0; j<k; j++)

            if(lista[j] == lista[k])
            {
                contador = 1;
            }
        if(contador==0)
            k++;
    } while(k<tamanho);

    for(int i = 0; i <tamanho; i++)
    {
        num = lista[i];
        palavraEmbaralhada[i] = palavra[num];
    }

    printf("%s --> %s \n", palavra, palavraEmbaralhada);
}

int main()
{
    char palavra[50];
    bool verificacao;

    for(;;)
    {
        printf("Digite uma palavra: ");
        fgets(palavra, sizeof(palavra)-1, stdin);

        palavra[strcspn(palavra, "\n")] = 0;

        verificacao = verifica_palavra(palavra);

        if(!verificacao)
            printf("Nao e uma palavra \n");
        else
        {
            embaralha(palavra);
        }
    }
}
