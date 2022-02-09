#include <stdio.h>

int main()
{
    int n;

    printf("Digite a quantidade de numeros que serao inseridos:\n");
    scanf("%d", &n);

    while(n < 2)
    {
        printf("Digite a quantidade de numeros que serao inseridos:\n");
        scanf("%d", &n);
    }


    int L[n], k, soma, maiorSoma, menorSoma;

    for(int w = 0; w<n; w++)
    {
        printf("Numero %d: ", w+1);
        scanf("%d", &L[w]);
    }

    printf("Digite a quantidade de numeros que sequenciais analisados:\n");
    scanf("%d", &k);

    while(k < 2 || k > n)
    {
        printf("Digite a quantidade de numeros que sequenciais analisados:\n");
        scanf("%d", &k);
    }

    int maiorseq[k], menorseq[k];

    for(int i = 0; i< (n-k+1); i++)
    {
        for(int j = 0; j<k; j++)
        {
            soma += L[(i+j)];
        }


        if(i==0)
        {
            maiorSoma = soma;
            menorSoma = soma;
            for(int w=i; w<k+i; w++)
            {
                maiorseq[w-i] = L[w];
                menorseq[w-i] = L[w];
            }
        }

        else if(soma > maiorSoma)
        {
            maiorSoma = soma;

            for(int w=i; w<k+i; w++)
            {
                maiorseq[w-i] = L[w];
            }
        }

        else if(soma <= menorSoma)
        {
            menorSoma = soma;

            for(int w=i; w<k+i; w++)
            {
                menorseq[w-i] = L[w];
            }

        }
        soma = 0;
    }



    printf("Subsequencia de %d numeros consecutivos de maior soma = ", k);
    for(int i=0; i<k; i++)
    {
        printf("%d, ", maiorseq[i]);
    }
    printf("(soma = %d)", maiorSoma);

    printf("\n Subsequencia de %d numeros consecutivos de menor soma = ", k);
    for(int i=0; i<k; i++)
    {
        printf("%d, ", menorseq[i]);
    }
    printf("(soma = %d)", menorSoma);
}
