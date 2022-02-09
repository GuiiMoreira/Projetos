#include<stdio.h>

void le_termos_iniciais(int lista[], int tam)
{

    for(int i = 0; i < tam; i++)
    {
        printf("Digite um numero: ");
        scanf("%d", &lista[i]);
    }
}

void calcula_serie(int lista[], int serie[], int n)
{
    for(int i = 0; i<3; i++)
        serie[i] = lista[i];

    for(int i = 3; i<n; i++)
    {
        if(i%2==1)
            serie[i]= serie[i-3] + serie[i-2] + serie[i-1];
        if(i%2==0)
            serie[i]= serie[i-3] - serie[i-2] - serie[i-1];
    }
}

void inverte_serie(int serie[], int serieInvertida[], int n)
{
    for(int i=0; i<n; i++)
        serieInvertida[i] = serie[n-i-1];
}

void imprime_serie(int serieInvertida[], int n)
{
    for(int i=0; i<n; i++)
        printf("%d ", serieInvertida[i]);
}

int main()
{
    int lista[3], n;

    printf("Digite a quantidade de termos para a serie: ");
    scanf("%d", &n);
    while(n<=4)
    {
        printf("Digite a quantidade de termos para a serie: ");
        scanf("%d", &n);
    }

    int serie[n], serieInvertida[n];

    le_termos_iniciais(lista, 3);

    calcula_serie(lista, serie, n);

    inverte_serie(serie, serieInvertida, n);

    imprime_serie(serieInvertida, n);
}
