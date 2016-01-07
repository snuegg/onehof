class HomeController < ApplicationController
    
    def home
    end
    
    def onehof
    end
    
    def jujum
    end
    
    def dong
    end
    
    def festival
    end
    
    def write
    end
    
    def cert
    end
    
    def testuser
        render json: User.all
    end
end
