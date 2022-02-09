#include <stdio.h>
#include <math.h>

struct Ponto
{
    float x;
    float y;
};

void le_pontos(int n, Ponto ponto[])
{
    for (int i = 0; i < n; i++)
    {
        printf("Digite o valor de X do ponto %d: ", i+1);
        scanf("%f", &ponto[i].x);

        printf("Digite o valor de Y do ponto %d: ", i+1);
        scanf("%f", &ponto[i].y);
    }
}

int calculcar_quantidade_iteracoes(int n)
{
    int nFatorial = 1, pFatorial=1, p = n-1, t= n+1, totalcombinacao;

    while( t > 0 )
        nFatorial *= t--;

    while( p > 0 )
        pFatorial *= p--;

    totalcombinacao = nFatorial /pFatorial;

    return totalcombinacao;
}


void distancia(Ponto ponto[], int n, int qtdIteracoes, float distanciasResultados[])
{
    float dx, dy;
    int k=0;

    for (int i = 0; i < n; i++)
    {
        for(int j = 0; j < n; j++)
            if(i!=j)
            {
                dx = pow(ponto[i].x - ponto[j].x, 2);
                dy = pow(ponto[i].y - ponto[j].y, 2);

                distanciasResultados[k] = sqrt(dx + dy);

                k++;
            };
    }
}

void calcula_circunferencia(float distanciasResultados[], Ponto ponto[], int n, int combinacao)
{
    float raio = 0, raioMinimo = 0;
    int centro = 0;

    for (int i = 0; i < n; i++)
    {
        for (int j = i*(n-1); j < (n-1)*(i+1); j++)
        {
            if(raio <= distanciasResultados[j])
                raio = distanciasResultados[j];

        }

        if(i==0)
            raioMinimo = raio;

        if(i!= 0 && raioMinimo > raio)
        {
            raioMinimo=raio;
            centro = i;
        }

        raio=0;
    }

    printf("centro: (%.4f, %.4f)\nraio:  %.4f",  ponto[centro].x, ponto[centro].y, raioMinimo);
}


int main()
{
    int n, combinacao;
    float d;

    printf("Digite a quantidade de pontos: ");
    scanf("%d", &n);

    while (n <= 4)
    {
        printf("A quantidade minima sao 5 pontos, digite outro valor: ");
        scanf("%d", &n);
    };

    Ponto ponto[n];

    le_pontos(n, ponto);

    combinacao = calculcar_quantidade_iteracoes(n-1);

    float distanciasResultados[combinacao];

    distancia(ponto, n, combinacao, distanciasResultados);

    calcula_circunferencia(distanciasResultados, ponto, n, combinacao);
}
