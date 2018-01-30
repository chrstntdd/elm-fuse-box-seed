module Main exposing (..)

import Html exposing (Html, div, p, program, text, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


{- MODEL -}


type alias Model =
    { count : Int
    }


initialModel : Model
initialModel =
    { count = 0
    }



{- VIEW -}


view : Model -> Html Msg
view model =
    div []
        [ p [] [ "The count is " ++ (toString model.count) |> text ]
        , button [ class "button", onClick Increment ] [ text "+1" ]
        , button [ class "button", onClick Decrement ] [ text "-1" ]
        ]



{- UPDATE -}


type Msg
    = NoOp
    | Increment
    | Decrement


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            model ! []

        Increment ->
            { model | count = model.count + 1 } ! []

        Decrement ->
            { model | count = model.count - 1 } ! []



{- SUBSCRIPTIONS -}


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



{- MAIN -}


init : ( Model, Cmd Msg )
init =
    initialModel ! []


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
